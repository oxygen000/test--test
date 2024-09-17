import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './routes/routes.js';
import dbCon from "./utlis/db.js";

dotenv.config();
const app = express();

// الاتصال بقاعدة البيانات مع التعامل مع الأخطاء
try {
    dbCon(); // اتصل بقاعدة البيانات
} catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // أخرج من العملية في حال فشل الاتصال
}

app.use(cors());
app.use(express.json());
app.use('/api', routers);

const PORT = process.env.PORT || 8000;

// التعامل مع الأخطاء عند بدء الاستماع للخادم
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
