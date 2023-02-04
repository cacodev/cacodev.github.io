import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"
import THEME from "../../theme";

interface IBlogListElement {
  data: {
    slug: string
    date: string
    title: string
    description: string
    coverFluid: any | null
  }
}

export default ({ data }: IBlogListElement) => (
  <div style={{ marginTop: 25, marginBottom: 25 }}>
    <Card>
      <CardActionArea>
        <Link
          to={data.slug}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardHeader
            title={data.title}
            subheader={data.date}
          />
          {data.coverFluid ? <GatsbyImage alt="img" image={data.coverFluid}  /> : null}
          <CardContent>
            <Typography component="p">{data.description}</Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  </div>
)
