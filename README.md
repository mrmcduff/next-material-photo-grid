# Purpose

This is a sample project that combines NextJS, Material UI, and a smattering of techniques
using [React hooks](https://reactjs.org/docs/hooks-intro.html).
The photo grid page is an infinite-scrolling grid view using
the sample [Elder Scrolls Legends API](https://elderscrollslegends.io/) to
display simplified cards that you can search for by name.

Code for this was adapted from:
* [The mui-org next js example](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)
* [Mui-Org Next JS with Typescript](https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript)
* [NextJS + Typescript with a valid _app type](https://github.com/myeongjae-kim/next-js-with-typescript-valid-app-type)
* [react-infinite-scroll-hook](https://www.npmjs.com/package/react-infinite-scroll-hook)

## To run this repo locally
Clone the repo. Then, use `yarn`:
```bash
yarn install
yarn dev
```
If you'd like to run unit tests:
```bash
yarn test
```
You can run these with npm if you'd like - the only difference is that you'll generate a `package-lock.json` file that subsequent `yarn` builds won't be happy about.

## Deploy your own github project

Want to deploy your own repo with Vercel/ZEIT? It's easy: [Vercel Now](https://vercel.com/home):
