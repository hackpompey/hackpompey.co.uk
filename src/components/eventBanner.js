import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./eventBanner.module.css"
import BackgroundImage from "gatsby-background-image"

/**
 * Banner displaying metadata about an event, linking to the event page
 */
const EventBanner = ({ event, bannerSVG, banner }) => {
  const meta = event.frontmatter

  // Determine URL of event page
  const mdPathParts = event.fileAbsolutePath.split("/")
  const mdFileName = mdPathParts[mdPathParts.length - 1].split(".")[0]
  const eventPageURL = "/events/" + mdFileName

  const customStyle = {}
  if (meta.banner_background) {
    // Background colour/gradient
    customStyle["background"] = meta.banner_background
  }
  if (meta.banner_background_image) {
    // Background image
    customStyle[
      "backgroundImage"
    ] = `url("../${meta.banner_background_image}")`
  }
  if (meta.banner_foreground_color) {
    // Text colour
    customStyle["color"] = meta.banner_foreground_color
  }

  return (
    <div className={style.hack} style={customStyle}>
      <Link to={eventPageURL}>
        {/* Prefer SVG */}
        {bannerSVG && (
          <h3
            className={style.hack_logo}
            style={{
              "backgroundImage": `url(${bannerSVG.publicURL})`,
              color: "rgba(0,0,0,0)",
            }}
          >
            {meta.title}
          </h3>
        )}
        {/* Otherwise optimised image */}
        {!bannerSVG && banner && (
          <BackgroundImage
            Tag="h3"
            className={style.hack_logo}
            fluid={banner.fluid}
            fadeIn={false}
          />
        )}
        {/* Otherwise event title */}
        {!bannerSVG && !banner && <h3>{meta.title}</h3>}
      </Link>

      <section className={style.hack_info}>
        <ul>
          <li>{meta.dateText}</li>
          <li>{meta.location}</li>
        </ul>

        <ul className={style.hack_links}>
          {/* Eventbrite link if set */}
          {meta.eventbrite_link && (
            <li>
              <a href={meta.eventbrite_link}>
                <FontAwesomeIcon icon={["fas", "ticket-alt"]} /> Eventbrite
              </a>
            </li>
          )}

          {/* Writeup link if set */}
          {meta.writeup_link && (
            <li>
              <a href={meta.writeup_link}>
                <FontAwesomeIcon icon={["fas", "newspaper"]} /> Write up
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default EventBanner
