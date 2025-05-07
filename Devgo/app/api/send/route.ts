
import { Resend } from 'resend';
import React from 'react';
import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'yacine@footygogo.com',
      to: 'ybouklif@gmail.com',
      subject: 'Test',
      react: React.createElement(EmailTemplate, { firstName: 'John' }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}