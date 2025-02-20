import React from 'react';

interface WorkExperienceItem {
  startDate: string;
  endDate?: string;
  duration: string;
  companyName: string;
  jobTitle: string;
  description: string[];
}

const workExperienceData: WorkExperienceItem[] = [
  {
    startDate: 'Nov 2021',
    endDate: 'Present',
    duration: '3 yrs 4 mos',
    companyName: 'Cloudinary',
    jobTitle: 'Contractor',
    description: [
      'Worked across DevRel and Marketing as a technical author and SDK Engineer, building developer-focused solutions and Next.js-based workflows for marketing automation.',
      'Led developer relations initiatives by creating sample applications and code demos showcasing Cloudinary’s advanced media transformations in Node.js and Next.js.',
      'Architected AI-driven content pipelines for social media, automating post generation, image transformations, and scheduling on LinkedIn, X, and YouTube.',
      'Developed custom Puppeteer-based scraping tools to extract and process blog content for automated social media posting.',
      'Built dashboards (React + Next.js) to analyze developer engagement trends, implementing data-driven improvements to content strategy and outreach.',
      'Implemented advanced marketing automation workflows with GitHub Actions, Next.js serverless functions, and Cloudinary’s APIs, reducing manual effort by 70% in content scheduling and publishing.',
      'Authored and optimized technical articles, guides, and in-depth API documentation, boosting developer engagement and organic traffic.',
    ],
  },
  {
    startDate: 'Dec 2023',
    endDate: 'Dec 2024',
    duration: '1 yr',
    companyName: 'QuickBus (Acquired by BuuPass)',
    jobTitle: 'Contractor',
    description: [
      'Designed and developed a WhatsApp bot for QuickBus, automating customer interactions and handling over 10,000 messages daily.',
      'Built a scalable backend with NestJS and TypeScript, reducing API response times by 40%.',
      'Utilized Redis for caching, reducing database queries by 60% and improving performance.',
      'Deployed on AWS EC2, ensuring 99.9% uptime and high availability.',
      'Integrated MessageBird API, improving message delivery success rate to 98%.',
      'Automated workflows with GitHub Actions, reducing deployment time from 30 minutes to under 5 minutes.',
      'Implemented WebSockets and Redis Pub/Sub for real-time messaging, reducing latency by 50%.',
      'Used RxJS for reactive programming and Jest for unit and integration testing, achieving 90% test coverage.',
    ],
  },
  {
    startDate: 'Sep 2019',
    endDate: 'Dec 2021',
    duration: '2 yrs 4 mos',
    companyName: 'Saada (Acquired)',
    jobTitle: 'Co-founder & Founding Technical Lead',
    description: [
      'Led full SDLC from architecture design to deployment, ensuring scalability and performance.',
      'Designed microservices and serverless architectures, handling millions of requests per day.',
      'Built fully automated CI/CD pipelines with Docker, Kubernetes, and Terraform, reducing deployment time by 70%.',
      'Implemented OAuth, JWT, and GDPR best practices, enhancing data protection and reducing vulnerabilities by 50%.',
      'Optimized cloud infrastructure, reducing costs by 30% while maintaining 99.99% uptime.',
      'Integrated real-time WebSockets and event-driven systems, cutting API response times by 40%.',
      'Deployed AWS CloudWatch, Prometheus, and ELK Stack, ensuring high availability and proactive issue detection.',
      'Built and managed cross-functional engineering teams, fostering a culture of innovation and technical excellence.',
      'Researched and adopted emerging AI, cloud computing, and blockchain technologies to enhance system capabilities.',
    ],
  },
  {
    startDate: 'Jan 2018',
    endDate: 'Dec 2020',
    duration: '3 yrs',
    companyName: 'hackitafrica',
    jobTitle: 'Developer Advocate',
    description: [
      'Organized events, meetups, and workshops to foster developer networking and collaboration.',
      'Authored documentation, blog posts, and tutorials to enhance developer understanding.',
      'Led campaigns, spoke at conferences, and collaborated with influencers to promote hackitafrica.',
      'Provided hands-on assistance, addressed queries, and facilitated a feedback loop for product improvement.',
      'Tracked and reported key performance indicators for developer engagement and advocacy impact.',
    ],
  },
];

const totalExperience = '6+ years';

const WorkExperience: React.FC = () => {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
        Work Experience
      </h1>
      <p className='text-lg font-medium text-gray-600 dark:text-gray-300'>
        <span className='font-semibold'>Total Experience:</span>{' '}
        {totalExperience}
      </p>
      <ol className='relative border-s border-gray-200 dark:border-gray-700'>
        {workExperienceData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === workExperienceData.length - 1 ? 'mb-0' : ''
            }`}
          >
            <div className='absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-blue-400'></div>
            <time className='mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400'>
              {item.startDate} - {item.endDate || 'Present'} ({item.duration})
            </time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              {item.jobTitle} at{' '}
              <span className='text-blue-600 dark:text-blue-400'>
                {item.companyName}
              </span>
            </h3>
            <ul className='list-disc list-outside ml-6 text-base font-normal text-gray-700 dark:text-gray-400 space-y-1'>
              {item.description.map((desc, i) => (
                <li key={i} className='leading-relaxed'>
                  {desc}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperience;
