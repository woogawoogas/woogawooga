import React from "react"
import DefaultHead from "@/utils/defaultHead"

export default function Index() {
  return (
    <React.Fragment>
      <DefaultHead
        title='test'
        description='테스트'
        seo='테스트'
        keyword='테스트, next.js'
      />
      <h1>안녕</h1>
    </React.Fragment>
  )
}
