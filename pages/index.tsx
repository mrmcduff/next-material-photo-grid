import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '../components/Link';
import Typography from '@material-ui/core/Typography';

const IndexPage = () => {
    return (
        <Container maxWidth="md">
            <Box marginY={4}>
                <Typography variant="h5">NextJS | Material UI | Typescript | Hooks Demo</Typography>
                <Link href="/photogrid">Card Grid</Link>
                {' | '}
                <Link href="https://github.com/mrmcduff/next-material-photo-grid">Project Github</Link>
                {' | '}
                <Link href="https://www.linkedin.com/in/michaelmcduffee/">My LinkedIn</Link>
            </Box>
            <Box marginY={4}>
                <Typography variant="body1">
                    This is a sample project that combines <Link href="https://nextjs.org/">NextJS</Link>,{' '}
                    <Link href="https://material-ui.com/">Material UI</Link>, and a smattering of techniques
                    using <Link href="https://reactjs.org/docs/hooks-intro.html">React hooks</Link>.
                    The <Link href="/photogrid">card grid</Link> page is an infinite-scrolling grid view using
                    the sample <Link href="https://elderscrollslegends.io/">Elder Scrolls Legends API</Link> to
                    display simplified cards that you can search for by name.
                </Typography>
                <br />
                <Typography variant="body1">The key components are:
                    <ul>
                        <li><Link href="https://material-ui.com/components/grid/">Material Grid</Link>,
                        which allows for very simple organization of array-like elements and trivial responsive sizing.</li>
                        <li>The <Link href="https://www.npmjs.com/package/react-infinite-scroll-hook">react-infinite-scroll-hook</Link>,
                        which makes the measure-paginate-api loop very simple to manage.</li>
                        <li>Not directly imported, but {''}
                            <Link href="https://github.com/myeongjae-kim/next-js-with-typescript-valid-app-type">
                                Myeongjae Kim's NextJS with Typescript and valid app type
                            </Link>
                            {' '}was key in having a proper NextJS app template that worked with TS.
                        </li>
                        <li>
                            Some styling inspired by / adapted from{' '}
                            <Link href="https://github.com/mui-org/material-ui/tree/master/examples/nextjs">
                                the Mui-org's NextJS template
                            </Link>.
                        </li>
                        <li>
                            Incredibly easy deployment with{' '}
                            <Link href="https://vercel.com/docs">Now from Vercel (formerly ZEIT)</Link>
                        </li>
                    </ul>
                </Typography>
            </Box>
        </Container>
    );
}

export default IndexPage
