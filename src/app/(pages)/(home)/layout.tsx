import React from 'react'
import { Metadata } from 'next'

import { meta, website_schema, organization_schema } from './seo'

// --- SEO
export const metadata: Metadata = meta
const website_jsonLd = website_schema
const organization_jsonLd = organization_schema

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*-------------------  SEO ---------------- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization_jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website_jsonLd) }} />
      {children}
    </>
  )
}
