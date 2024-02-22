export const resetPasswordTemplate = (token: string, id: number) => {
  return (
    `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Reset Password Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

      <div style="padding: 20px;">
        <h2 style="color: #333333;">Reset Password for Todoucan!</h2>
        <p style="color: #666666;">Click <a href="http://localhost:3000/reset-password/${token}/${id}" target="_blank" style="color: #0000FF; text-decoration: none;">here</a> to reset your password</p>
      </div>
    </div>
    </body>
    </html>`
  )
}