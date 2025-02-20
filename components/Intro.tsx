import Image from 'next/image';
import ProfilePic from '@/app/images/me.webp';

export default function Intro() {
  return (
    <div className='w-full flex flex-col-reverse lg:flex-row gap-14 justify-between items-center -z-10'>
      <div className='flex flex-col gap-4 w-full lg:w-4/5'>
        <h1 className='text-4xl font-bold mb-4'>Hi! I&apos;m Eugene Musebe.</h1>
        <p className='text-lg text-gray-800 dark:text-gray-300 leading-relaxed'>
          I am a <span className='font-semibold'>Full-Stack Engineer</span> with{' '}
          <span className='font-semibold'>6+ years</span> of experience in
          software development, technical writing, and automation engineering. I
          specialize in designing and building scalable applications, optimizing
          cloud infrastructure, and automating workflows.
        </p>
        <p className='text-lg text-gray-800 dark:text-gray-300 leading-relaxed'>
          My expertise spans across{' '}
          <span className='font-semibold'>
            frontend, backend, DevOps, and system architecture
          </span>
          . I have led development teams, built AI-powered content pipelines,
          automated social media workflows, and optimized CI/CD pipelines to
          reduce deployment time by 70%.
        </p>
        <p className='text-lg text-gray-800 dark:text-gray-300 leading-relaxed'>
          Passionate about leveraging{' '}
          <span className='font-semibold'>
            AI, automation, and cloud technologies
          </span>{' '}
          to drive efficiency, enhance developer experiences, and scale
          applications globally.
        </p>
      </div>
      <div className='flex items-center justify-center md:mb-0'>
        <Image
          src={ProfilePic}
          alt='Eugene Musebe'
          width={180}
          height={180}
          className='border-4 border-gray-300 dark:border-gray-700 rounded-full object-cover shadow-lg'
          priority
          loading='eager'
        />
      </div>
    </div>
  );
}
