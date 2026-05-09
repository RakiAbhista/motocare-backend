<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp; // Menerima data OTP dari Controller
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Kode OTP Reset Password - MotoCare',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.otp', // Kita akan buat view ini di langkah 3
        );
    }

    public function attachments(): array
    {
        return [];
    }
}