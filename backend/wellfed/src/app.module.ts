import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb+srv://rithvikvelapati:oaQemZKZcKQetcbl@wellfed-cluster.qe51k.mongodb.net/?retryWrites=true&w=majority&appName=WellFed-Cluster',  // Replace with your MongoDB connection string
    useUnifiedTopology: true,
    database: 'WellFed_DB',
    synchronize: true,  // Automatically sync schema with database (not recommended for production)
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
