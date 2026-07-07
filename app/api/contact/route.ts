import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const msg = String(body.msg ?? '').trim()

  if (!name || !email || !msg) {
    return NextResponse.json({ ok: false, error: 'All fields are required' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `[Arcade Vault] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${msg}`,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
