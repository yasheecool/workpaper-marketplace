'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const Listings = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <section className='py-8  text-gray-800'>
      <div
        className='max-w-7xl mx-auto w-[95vw] grid gap-6 px-4
      grid-rows-[auto_380px_1fr_auto] lg:grid-cols-[7fr_minmax(275px,3fr)] lg:grid-rows-[380px_auto] lg:items-start'
      >
        <div className='flex flex-col gap-10 lg:order-2'>
          <div className=' grid grid-cols-[1fr_auto] gap-4   rounded-md bg-gray-100 p-4'>
            <h1 className='text-2xl font-semibold'>
              GST Tax Reconciliation Checklist
            </h1>

            <div className='flex gap-2 items-center lg:order-1 lg:flex-col  lg:justify-center lg:items-stretch'>
              <button className='btn text-secondary-500 bg-transparent  border-secondary-500  hover:bg-white'>
                Save Listing
              </button>
              <button className='btn bg-secondary-500 hover:bg-secondary-700 px-10 text-white'>
                Install
              </button>
            </div>

            <div className='flex justify-between col-span-2 lg:flex-col'>
              <p className='text-xs text-gray-600 '>
                By{' '}
                <span className='link link-hover font-semibold'>
                  Cimplico Pvt Ltd
                </span>
              </p>

              <p className='text-xs '>
                <span className='link link-hover'>
                  Last Updated: 25 April, 2025
                </span>
              </p>
              <p className='text-xs'>Date Created: 18 April, 2025</p>
            </div>
          </div>
        </div>

        <div className='h-[380px] relative bg-blue-100 border-[0.5] lg:order-1'>
          <Image alt={'listing image'} src={'/undraw_approve.svg'} fill />
        </div>

        <div className='rounded-md flex flex-col gap-8 lg:order-3'>
          <div className='flex flex-col gap-6'>
            <div>
              <h2 className='text-xl font-semibold'>Short Description</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam deserunt autem in expedita quam eos dolor animi nihil
                quibusdam! Magni aliquam adipisci accusamus commodi? Illo earum
                tenetur possimus delectus quas.
              </p>
            </div>

            <div>
              <h2 className='text-xl font-semibold'>Long Description</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam deserunt autem in expedita quam eos dolor animi nihil
                quibusdam! Magni aliquam adipisci accusamus commodi? Illo earum
                tenetur possimus delectus quas. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Cumque, possimus. Maiores quia
                reprehenderit veritatis dolore odit soluta explicabo, vero
                dolorum eos. Libero esse repudiandae harum est, temporibus
                similique id nihil! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Corrupti error quas alias iure nemo ullam,
                fuga et perspiciatis a ut minus veniam numquam quo ea asperiores
                molestias, aliquam consectetur placeat?
              </p>
            </div>

            <div>
              <h2 className='text-xl font-semibold'>Getting Started Steps</h2>
              <ul>
                <li>Quibusdam, accusantium exercitationem?</li>

                <li>Nostrum illum laboriosam, voluptate similique saepe.</li>
                <li>Nostrum illum laboriosam, voluptate similique saepe.</li>
                <li>Nostrum illum laboriosam, voluptate similique saepe.</li>
                <li>Nostrum illum laboriosam, voluptate similique saepe.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>Listing Support</h2>
            <p>Support Email: johndoe@gmail.com</p>
            <p>Support Phone: 0413242334</p>
            <p>
              Vendor Information:{' '}
              <span className='link link-hover font-semibold'>
                Cimplico Pvt Ltd
              </span>
            </p>
          </div>
        </div>

        <div className='bg-gray-50 p-4 lg:order-4'>
          <h2 className='text-xl font-semibold mb-4'>Additional Details</h2>
          <div className='flex flex-col gap-2 text-sm'>
            <p>
              Listing type:{' '}
              <span className='badge badge-primary opacity-80'>Checklist</span>
            </p>

            <p>Applicable for: Individuals, Firms</p>
            <p>Workpaper Type: Tax Planning</p>
            <p>Tags: Checklist, GST, Individual, Tax</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Listings;

//TODO:
//In the RHS Card
//Version History
//Creation Date
//Workpaper type
//entity type
//content type
//tags

//in the LHS section
//Images/Videos
//Short Desc
//long desc
//GettingStarted Steps
//Author details and support info
