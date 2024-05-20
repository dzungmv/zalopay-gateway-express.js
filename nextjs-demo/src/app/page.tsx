import Image from 'next/image';
import dummy from '@/components/dummy.json';
import Card from '@/components/card';

export default function Home() {
    return (
        <section className='w-full max-w-[800px] mx-auto mt-24 '>
            <section className='flex items-center gap-2 mb-5'>
                <figcaption className='w-10 h-10 relative'>
                    <Image
                        src='/momo.png'
                        fill
                        alt=''
                        className=' object-cover'
                    />
                </figcaption>
                <h1 className=' text-[#0068FF] text-lg font-bold'>
                    ZALOPAY DEMO
                </h1>
            </section>
            <main className=' grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {dummy.map((item) => (
                    <Card key={item.id} {...item} />
                ))}
            </main>
        </section>
    );
}
