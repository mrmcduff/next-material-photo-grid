import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '../src/Link';
import Typography from '@material-ui/core/Typography';

const IndexPage = () => {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h3">Hello Next.js 👋</Typography>
                <Link href="/about">
                    About
                </Link>
            </Box>
        </Container>
    );
}

export default IndexPage
