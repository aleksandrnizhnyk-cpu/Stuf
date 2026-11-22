import React, { useEffect, useState } from 'react';
import { LogIn, LogOut, UserRound, X } from 'lucide-react';
import { getSupabase } from '../lib/supabaseClient';

function authError(error, fallback) {
  const message = error instanceof Error ? error.message : '';
  const normalized = message.toLowerCase();
  if (normalized.includes('invalid login credentials')) return 'Неверный email или пароль.';
  if (normalized.includes('email not confirmed')) return 'Подтверди email по ссылке из письма.';
  if (normalized.includes('rate limit')) return 'Слишком много попыток. Подожди немного и попробуй снова.';
  return message || fallback;
}

export default function StaffAuth() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [accountName, setAccountName] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const db = getSupabase();
    if (!db) return;
    db.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) setAccountName(user.user_metadata?.username || user.email?.split('@')[0] || 'STAFF member');
    });
    const { data } = db.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setAccountName(user ? (user.user_metadata?.username || user.email?.split('@')[0] || 'STAFF member') : '');
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(event) {
    event.preventDefault();
    const db = getSupabase();
    if (!db) { setNotice('Авторизация пока не настроена: добавь переменные Supabase для STAFF.'); return; }
    setBusy(true);
    setNotice('');
    try {
      if (mode === 'signup') {
        const name = nickname.trim();
        if (!/^[A-Za-z0-9_]{3,24}$/.test(name)) throw new Error('Никнейм: 3–24 символа, латинские буквы, цифры или _.');
        const { data, error } = await db.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { username: name } }
        });
        if (error) throw error;
        if (data.session) {
          setOpen(false);
          setNotice('Аккаунт STAFF создан. Ты вошёл в систему.');
        } else {
          setNotice('Заявка на регистрацию создана. Проверь почту и подтверди адрес перед входом.');
          setMode('signin');
        }
      } else if (mode === 'recovery') {
        const { error } = await db.auth.updateUser({ password });
        if (error) throw error;
        setMode('signin');
        setPassword('');
        setOpen(false);
        setNotice('Пароль изменён. Теперь войди с новым паролем.');
      } else {
        const { error } = await db.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setOpen(false);
      }
    } catch (error) {
      setNotice(authError(error, 'Не удалось выполнить действие.'));
    } finally {
      setBusy(false);
    }
  }

  async function requestReset() {
    const db = getSupabase();
    if (!db) { setNotice('Восстановление недоступно: Supabase ещё не настроен.'); return; }
    if (!email.trim()) { setNotice('Сначала введи email.'); return; }
    setBusy(true);
    setNotice('');
    try {
      const redirectTo = window.location.origin + '/?auth=recovery';
      const { error } = await db.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (error) throw error;
      setNotice('Если аккаунт с таким email существует, письмо для восстановления отправлено.');
    } catch (error) {
      setNotice(authError(error, 'Не удалось отправить письмо.'));
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    const db = getSupabase();
    if (!db) return;
    setBusy(true);
    const { error } = await db.auth.signOut();
    setBusy(false);
    setNotice(error ? authError(error, 'Не удалось выйти.') : 'Ты вышел из аккаунта STAFF.');
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'recovery') {
      setMode('recovery');
      setOpen(true);
      setNotice('Введи новый пароль.');
    }
  }, []);

  return (
    <>
      {accountName ? (
        <button onClick={signOut} disabled={busy} className="flex items-center gap-2 px-4 py-2 bg-[#202319] border border-[#777747] text-[#d0c99a] text-xs font-bold rounded-xl">
          <UserRound className="w-4 h-4"/> @{accountName} <LogOut className="w-4 h-4"/>
        </button>
      ) : (
        <button onClick={() => { setMode('signin'); setNotice(''); setOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#777747] hover:bg-[#898a55] text-white text-xs font-bold rounded-xl">
          <LogIn className="w-4 h-4"/> Login / Join
        </button>
      )}
      {notice && !open && <span className="sr-only" role="status">{notice}</span>}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <section className="relative w-full max-w-md rounded-2xl border border-[#777747] bg-[#151812] p-6 shadow-2xl" role="dialog" aria-modal="true">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-white" aria-label="Закрыть"><X/></button>
            <p className="text-[10px] tracking-[.2em] text-[#c0b878] uppercase">STAFF / ACCOUNT</p>
            <h2 className="text-2xl font-black uppercase text-white mt-3 mb-2">{mode === 'signup' ? 'Create your account' : mode === 'recovery' ? 'New password' : 'Welcome back'}</h2>
            <p className="text-xs leading-6 text-gray-400 mb-5">Публично отображается никнейм. Email используется для входа и не показывается другим участникам.</p>
            <form onSubmit={submit} className="space-y-4">
              {mode === 'signup' && <label className="block text-xs text-gray-300">Никнейм<input required minLength={3} maxLength={24} value={nickname} onChange={e => setNickname(e.target.value.replace(/[^A-Za-z0-9_]/g,''))} className="mt-2 w-full rounded-lg border border-[#4b5035] bg-black/40 px-3 py-3 text-white outline-none focus:border-[#aaa16a]" placeholder="your_nickname"/></label>}
              {mode !== 'recovery' && <label className="block text-xs text-gray-300">Email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-[#4b5035] bg-black/40 px-3 py-3 text-white outline-none focus:border-[#aaa16a]" placeholder="you@example.com"/></label>}
              <label className="block text-xs text-gray-300">Пароль<input required type="password" minLength={8} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-[#4b5035] bg-black/40 px-3 py-3 text-white outline-none focus:border-[#aaa16a]" placeholder="Минимум 8 символов"/></label>
              {notice && <p role="status" className="text-xs leading-5 text-[#d0c99a]">{notice}</p>}
              <button disabled={busy} className="w-full rounded-lg bg-[#777747] hover:bg-[#898a55] disabled:opacity-50 py-3 text-sm font-bold text-white">{busy ? 'Подожди…' : mode === 'signup' ? 'Create account' : mode === 'recovery' ? 'Save new password' : 'Sign in'}</button>
            </form>
            <div className="mt-4 flex flex-col items-start gap-3">
              {mode === 'signin' && <button disabled={busy} onClick={requestReset} className="text-xs text-[#c0b878] hover:text-white">Забыли пароль?</button>}
              <button disabled={busy} onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setNotice(''); setPassword(''); }} className="text-xs text-gray-300 hover:text-white">{mode === 'signin' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
