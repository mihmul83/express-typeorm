import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Photo } from '../entities/photo.entity';

@Service()
export class PhotoService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) { }

  public async getAll (skip: number, limit: number) {
    return await this.photoRepository.find({
      skip: skip,
      take: limit,
      relations: ['user']
    });
  }

  public async findById (id: number) {
    return await this.photoRepository.findOneOrFail(id, { relations: ['user'] });
  }

  public async create (photo: any) {
    const newPhoto = this.photoRepository.create(photo);
    await this.photoRepository.save(newPhoto);
    return newPhoto;
  }

  public async deleteById (id: number) {
    await this.photoRepository.delete(id);
    return { status: 'completed' };
  }

  public async deleteByUserId (id: number) {
    await this.photoRepository.createQueryBuilder()
      .delete()
      .from(Photo)
      .where('user = :id', { id })
      .execute();
    return { status: 'completed' };
  }
}
