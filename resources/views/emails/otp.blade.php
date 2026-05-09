<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h2>Halo!</h2>
    <p>Kamu telah meminta untuk mereset password di aplikasi MotoCare.</p>
    <p>Berikut adalah kode OTP rahasia kamu:</p>
    
    <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #119CFF; margin: 20px 0;">
        {{ $otp }}
    </div>

    <p>Kode ini hanya berlaku selama 15 menit.</p>
    <p><strong>Jangan berikan kode ini kepada siapapun!</strong></p>
    <br>
    <p>Terima kasih,<br>Tim MotoCare</p>
</body>
</html>
