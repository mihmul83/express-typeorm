import { Service } from 'typedi';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities/user.entity';
import { hash } from 'bcryptjs';
import { PhotoService } from './photo.service';

@Service()
export class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(User) private userRepository: Repository<User>,
    private photoService: PhotoService
  ) { }

  public async getAll (skip: number, limit: number) {
    return await this.userRepository.find({
      skip: skip,
      take: limit
    });
  }

  public async findById (id: number) {
    return await this.userRepository.findOneOrFail(id, { relations: ['photos'] });
  }

  public async create (user: any) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  public async updateById (id: number, userPartial: DeepPartial<User>) {
    const user = await this.userRepository.findOneOrFail(id);
    // eslint-disable-next-line guard-for-in
    for (const key in userPartial) {
      if (Object.prototype.hasOwnProperty.call(userPartial, key)) {
        user[key] = userPartial[key];
      }
      if (key === 'password') {
        user.password = await hash(user[key], 10);
      }
    }
    return this.userRepository.save(user);
  }

  public async deleteById (id: number) {
    await this.userRepository.delete(id);
    await this.photoService.deleteByUserId(id);
    return { status: 'completed' };
  }
}
