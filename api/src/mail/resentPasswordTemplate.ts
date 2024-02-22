export const resetPasswordTemplate = (token: string, id: number) => {
  return (
    `<!doctype html>
    <html lang=”en”>
    <head>
    <meta charset=”utf-8″>
    <title>Reset Your Password</title>
    <meta name=”description” content=”This is the description that search engines will display. Aim for 145-155 characters.”>
    <meta name=”Toucando” content=”Toucandou”>
    <style>
    body {
    background-color: #f6b092;
    }
    </style>
    </head>

    <body>
      <h1></h1>
      <p>Click <a href="http://localhost:3000/reset-password/${token}/${id}" target="_blank">here</a> to reset your password</p>
    </body>
    </html>`
  )
}