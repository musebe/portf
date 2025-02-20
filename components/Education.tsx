import React from 'react';

interface EducationItem {
  startDate: string;
  endDate?: string;
  institution: string;
  courseName: string;
  details?: string[];
}

const EducationData: EducationItem[] = [
  {
    startDate: 'Jan 2020',
    endDate: 'Dec 2023',
    institution: 'KCA University',
    courseName: "Bachelor's Degree, Business Information Technology",
    details: [
      'Currently finalizing my degree after pausing to focus on an intensive bootcamp.',
      'Studied business information systems, software development, and IT management.',
    ],
  },
  {
    startDate: 'Aug 2018',
    endDate: 'Sep 2019',
    institution: 'MEST Africa',
    courseName: 'Diploma, Computer Software Engineering & Entrepreneurship',
    details: [
      'Completed an intensive one-year Software Development & Entrepreneurship Bootcamp, specializing in full-stack development with JavaScript, PHP, and Python.',
      'Built and deployed web applications using React, Vue, Node.js, PHP, and Python.',
      'Developed RESTful APIs and database-driven applications with PostgreSQL, MongoDB, and Firebase.',
      'Managed cloud infrastructure with AWS, Docker, and Kubernetes, implementing CI/CD pipelines with GitHub Actions and Jenkins.',
      'Gained hands-on experience with backend services, system architecture, and serverless computing.',
      'Learned product development, business strategy, and startup growth, bridging the gap between technology and entrepreneurship.',
      'Worked in cross-functional teams, applying Agile methodologies to deliver real-world projects.',
    ],
  },
];

const Education: React.FC = () => {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
        Education
      </h1>
      <ol className='relative border-s border-gray-200 dark:border-gray-700'>
        {EducationData.map((item, index) => (
          <li
            key={index}
            className={`mb-10 ms-4 ${
              index === EducationData.length - 1 ? 'mb-0' : ''
            }`}
          >
            <div className='absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-blue-400'></div>
            <time className='mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400'>
              {item.startDate} - {item.endDate || 'Present'}
            </time>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              {item.courseName} at{' '}
              <span className='text-blue-600 dark:text-blue-400'>
                {item.institution}
              </span>
            </h3>
            <ul className='list-disc list-outside ml-6 text-base font-normal text-gray-700 dark:text-gray-400 space-y-1'>
              {item.details?.map((detail, index) => (
                <li key={index} className='leading-relaxed'>
                  {detail}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Education;
