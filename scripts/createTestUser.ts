// scripts/createTestUser.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createTestUser(): Promise<void> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    const plainPassword = 'test1234';

    // 使用 PASSWORD_SECRET 加盐，增加安全性
    const saltedPassword = `${plainPassword}${process.env.PASSWORD_SECRET}`;

    // 生成哈希密码
    const hashedPassword = await bcrypt.hash(saltedPassword, saltRounds);

    try {
        const user = await prisma.user.create({
            data: {
                username: 'test',
                email: 'test@example.com',
                password: hashedPassword,
            },
        });
        console.log('✅ 测试用户创建成功:', user);
    } catch (error) {
        console.error('❌ 创建用户失败:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();

