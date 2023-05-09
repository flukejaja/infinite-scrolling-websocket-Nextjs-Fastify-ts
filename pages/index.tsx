import axios from 'axios';
import Layout from './layout/layout';
import { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { FaFan } from 'react-icons/fa'
import { useInfiniteQuery } from 'react-query'
interface body_type {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: number;
}
export default function Home() {
  const { ref, inView } = useInView();
  const [getStatus, setGetStatus] = useState<number>(0);
  const { status, data, isFetching, fetchNextPage } = useInfiniteQuery('get', async ({ pageParam = 0 }) => {
    const data = await axios.get(`http://localhost:8000/post/get?id=${pageParam}`).then((response) => {
      setGetStatus(response.status)
      return response.data
    }).catch((error) => {
      setGetStatus(error.response.status)
      throw new Error("Error creating review")
    })
    return data.data
  })
  useEffect(() => {
    if (inView) {
      if (typeof data?.pages == 'object') {
        fetchNextPage({ pageParam: [].concat(...data?.pages).length })
      }
    }
  }, [inView])
  return (
    <div className=' w-full relative flex flex-col  divide-y'>
      <div className='h-14 flex justify-center items-center border-b fixed bg-white  inset-x-0 top-0 '>
        Home page
      </div>
      <div className='h-12 bg-black'></div>
      {
        status === 'loading' ? <div className='flex flex-col justify-center items-center h-screen '>
          <div className='animate-spin'><FaFan size={50} />
          </div>
        </div> :
          (typeof data?.pages == 'object') && [].concat(...data?.pages).map((data: body_type, idx) => (
            <div className='bg-white px-5 py-5 flex flex-col' key={idx}>
              <div className='flex flex-row border-b'>
                <div className='w-[10%] border-r text-center'>id {data.id}</div>
                <div className='w-full text-center'>{data.title}</div>
              </div>
              <div className='py-2'>{data.body}
              </div>
            </div>
          ))
      }
      {
        status == 'success' && <div ref={ref} className='h-14 bg-white flex justify-center items-center'>
          {(isFetching && getStatus !== 404) && <div className='flex flex-col justify-center items-center'>
            <div className='animate-spin'><FaFan size={50} />
            </div>
          </div>}
          {getStatus === 404 && <p>Not found</p>}
        </div>
      }

    </div>
  )
}
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
