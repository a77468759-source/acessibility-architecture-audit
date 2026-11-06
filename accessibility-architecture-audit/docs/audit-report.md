# Accessibility and architecture audit notes

This project was created as an original educational site inspired by general accessibility lessons rather than by copying a specific audited public website. The goal is to demonstrate a cleaner, more maintainable architecture and a stronger accessibility baseline.

## Accessibility principles applied

- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, and `footer`
- Real links using anchor elements for navigation
- Keyboard-first layout with predictable tab order
- Visible focus states and strong color contrast
- Clean heading hierarchy without skipped levels
- Meaningful labels on icon-only links
- Accessible form fields and live feedback area

## Architecture decisions

- Frontend and backend are intentionally separated to keep concerns clear.
- The API exposes a small set of endpoints for content and feedback.
- Data is served from a simple service layer and can be backed by MongoDB when configured.
- The project remains intentionally lightweight and friendly for beginners.
