
import { Sepolia } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import GithubTriangle from '../components/GithubTriangle';
import Head from 'next/head';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

// This is the chainId your dApp will work on.
// const activeChain = {  };
function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={Sepolia} >
			<Head>
				<title>zkSBT voting</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta
					name='description'
					content='zksbt voting web demo'
				/>
			</Head>
			<div className={styles.allBack}>


				<ul className={styles.ul} style={{ background: "black", width: "100vw", display:"flex", justifyContent:"left", paddingLeft:"10%" }} >
					<li style={{ width: "150px" }}>
						<Link className={styles.text} href="/">Home</Link>
					</li>
					<li style={{ width: "150px" }}>
						<Link className={styles.text} href="/getSBT">取得SBT</Link>
					</li>
					
					<li style={{ width: "150px" }}>
						<Link className={styles.text} href="voting">投票頁面</Link>
					</li>
				</ul>
				{/* <div style={{width:"100%", height:"1px", background:"white", marginBottom:"5%"}} ></div> */}
				<div className={styles.compCont}>
					<Component {...pageProps} />
				</div>

			</div>
			{/* <GithubTriangle /> */}

		</ThirdwebProvider>

	);
}

export default MyApp;
