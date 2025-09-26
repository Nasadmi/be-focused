import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PostgresModule,
    MongoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AppModule {}
