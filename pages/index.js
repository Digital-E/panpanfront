import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, allProjectsQuery, previewAllProjectsQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import { store } from "../store"


const Container = styled.div`
  position: relative;
  height: 100vh;
`

// let tags = [
//   'Audio',
//   'Text',
//   'Video',
//   'Climate',
//   'Environment',
//   'London',
// ]

// let key = [
//   'MA Cities',
//   'Staff Projects',
//   'Research',
//   'Partnerships',
//   'Network',
// ]

export default function Index({ data = {}, preview }) {

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  const router = useRouter()

  const slug = data?.homeData?.slug

  // if (!router.isFallback && !slug) {
  //   return <ErrorPage statusCode={404} />
  // }

  useEffect(() => {
    // document.querySelector("body").classList.add("body-lock");

    // return () => {
    //   document.querySelector("body").classList.remove("body-lock");
    // }
    document.querySelector("header").classList.remove("gray-scheme");
  }, []);
  

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.homeData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.homeData?.content}
          />
        </Head>
        <Container></Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let homeData = await getClient(preview).fetch(homeQuery)

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    allProjectsData = await getClient(preview).fetch(previewAllProjectsQuery)
  }


  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        homeData,
        allProjectsData,
        menuData,
        footerData
      }
    }
  }
}

