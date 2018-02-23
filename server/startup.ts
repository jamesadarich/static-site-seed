import { app } from "./app";

const PORT_NUMBER = process.env.HTTP_PORT || 8080;

app.listen(PORT_NUMBER);
process.stdout.write(`server listening at port ${PORT_NUMBER}`);
