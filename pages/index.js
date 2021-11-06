import Head from 'next/head';
import { Images } from '../src/data/MockedData';
import ImageRowContainer from '../src/components/containers/ImageRowContainer';
import startup from '../src/startup/startup';

startup();

export default function Home({ Images }) {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='rows-container'>
        <div>
          <h3 className='row__title'>My favorites</h3>
          <ImageRowContainer images={Images} indexEnd={Images.length} />
        </div>
        <div>
          <h3 className='row__title'>Popular</h3>
          <ImageRowContainer images={Images} indexEnd={Images.length} />
        </div>
        <div>
          <h3 className='row__title'>For you!</h3>
          <ImageRowContainer images={Images} indexEnd={Images.length} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = { Images };

  return { props: data };
}
