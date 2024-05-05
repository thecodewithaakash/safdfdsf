
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function PricingPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  // console.log(user);


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-36 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Welcome to User Management Platform</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">Welcome to our User Management App,where people login,signup & Update their account Information</p>
        </div>
        {user ?
          (
            ""
          ) : (
            <div className='flex justify-center'>
              <Link className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" href={'/signin'} >Sign In</Link>
            </div>
          )
        }
      </div>
    </section>
  );
}
