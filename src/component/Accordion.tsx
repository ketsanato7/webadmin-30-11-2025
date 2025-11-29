import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionList({ items = [] }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              {item.title}
            </Typography>

            {item.subtitle && (
              <Typography component="span" sx={{ color: "text.secondary" }}>
                {item.subtitle}
              </Typography>
            )}
          </AccordionSummary>

          <AccordionDetails>
            {typeof item.content === "string" ? (
              <Typography>{item.content}</Typography>
            ) : (
              item.content
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
