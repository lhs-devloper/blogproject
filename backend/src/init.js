import 'dotenv/config'
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`Server Starting...✔ \nClick Ctrl+Link: http://localhost:${PORT}`)

app.listen(PORT, handleListening)
