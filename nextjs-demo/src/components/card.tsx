import Image from 'next/image';
import dummy from './dummy.json';
import Link from 'next/link';

type IProps = (typeof dummy)[1];

export default function Card(props: IProps) {
    const { artist, name, price, thumnail, id } = props;
    return (
        <Link passHref href={`/checkout/${id}`}>
            <article className='group h-full overflow-hidden rounded-lg hover:cursor-pointer'>
                <section className='relative w-full overflow-hidden rounded-lg pb-[75%]'>
                    <figure className='absolute inset-0'>
                        <Image
                            src={thumnail}
                            alt={name}
                            title={name}
                            fill
                            className='rounded-lg object-cover transition-all duration-300 lg:group-hover:scale-105'
                            loading='lazy'
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                    </figure>
                </section>

                <section className='mt-2'>
                    <p className=' line-clamp-1 text-sm font-medium'>{name}</p>
                    <div className='flex items-end justify-between text-sm text-gray-600'>
                        {artist}
                        <p className='font-medium text-[#D82D88]'>
                            {price?.toLocaleString()}
                        </p>
                    </div>
                </section>
            </article>
        </Link>
    );
}
