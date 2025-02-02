import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/utils/email';
import WelcomeEmail from '@/app/(emails)/EmailBievenue';
import { createElement } from 'react';  

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();
    

    const emailElement = createElement(WelcomeEmail, { username });
    
    const result = await sendEmail({
      to: email,
      subject: 'Bienvenue!',
      emailComponent: emailElement
    });

    if (!result.success) {
      return NextResponse.json(
        { error: " Envoi d'email échoué." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}