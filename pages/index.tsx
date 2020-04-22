import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '../components/Link';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const IndexPage = () => {
    return (
        <Container maxWidth="md">
            <Box marginY={4}>
                <Typography variant="h5">NextJS | Material UI | Typescript | Hooks Demo</Typography>
                <Link variant="overline" href="/photogrid">Card Grid</Link>
                {' | '}
                <MuiLink variant="overline" href="https://github.com/mrmcduff/next-material-photo-grid">Project Github</MuiLink>
                {' | '}
                <MuiLink variant="overline" href="https://www.linkedin.com/in/michaelmcduffee/">My LinkedIn</MuiLink>
            </Box>
            <Box marginY={4}>
                <Typography variant="body1">
                    This is a sample project that combines <MuiLink href="https://nextjs.org/">NextJS</MuiLink>,{' '}
                    <MuiLink href="https://material-ui.com/">Material UI</MuiLink>, and a smattering of techniques
                    using <MuiLink href="https://reactjs.org/docs/hooks-intro.html">React hooks</MuiLink>.
                    The <Link href="/photogrid">card grid</Link> page is an infinite-scrolling grid view using
                    the sample <MuiLink href="https://elderscrollslegends.io/">Elder Scrolls Legends API</MuiLink> to
                    display simplified cards that you can search for by name.
                </Typography>
                <br />
                <Typography variant="body1">The key components are:</Typography>
                <ul>
                    <li>
                        <Typography variant="body1">
                            <MuiLink href="https://material-ui.com/components/grid/">Material Grid</MuiLink>,
                            which allows for very simple organization of array-like elements and trivial responsive sizing.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            The <MuiLink href="https://www.npmjs.com/package/react-infinite-scroll-hook">react-infinite-scroll-hook</MuiLink>,
                            which makes the measure-paginate-api loop very simple to manage.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Not directly imported, but {''}
                            <MuiLink href="https://github.com/myeongjae-kim/next-js-with-typescript-valid-app-type">
                                Myeongjae Kim's NextJS with Typescript and valid app type
                            </MuiLink>
                            {' '}was key in having a proper NextJS app template that worked with TS.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Some styling inspired by / adapted from{' '}
                            <MuiLink href="https://github.com/mui-org/material-ui/tree/master/examples/nextjs">
                                the Mui-org's NextJS template
                            </MuiLink>.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Incredibly easy deployment with{' '}
                            <MuiLink href="https://vercel.com/docs">Now from Vercel (formerly ZEIT)</MuiLink>
                        </Typography>
                    </li>
                </ul>
            </Box>
        </Container>
    );
}

export default IndexPage
