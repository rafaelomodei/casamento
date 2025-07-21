import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/infra/repositories/firebase/config'

export async function isEmailRegistered(email: string): Promise<boolean> {
  if (!auth) return false
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email)
    return methods.length > 0
  } catch {
    return false
  }
}

export async function registerIfNotExists(email: string, password: string) {
  if (!auth) return { ok: false, message: 'Auth not initialized.' }
  try {
    const registered = await isEmailRegistered(email)
    if (registered) {
      return { ok: false, message: 'Email is already registered.' }
    }
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    return { ok: true, user: userCred.user }
  } catch (err: any) {
    return { ok: false, message: err.message }
  }
}
