# Dashboard Placeholder Definition

```
Status: Draft
Phase: Planning Only
Execution: Not Authorized
```

---

## 1. Purpose

This document defines the specific placeholder strategy for the Admin Dashboard page. The Dashboard is the primary landing page and requires careful placeholder design to appear intentionally clean rather than broken.

**Note:** All changes described herein are conceptual. Implementation requires explicit authorization.

---

## 2. Current Dashboard Structure

The Dashboard currently contains:

| Component | Location | Current Content |
|-----------|----------|-----------------|
| Cards (4x) | Top row | Metric cards with demo numbers |
| Chart | Main content area | Line/bar chart with demo series |
| SaleChart | Secondary content | Sales trend chart |
| CountryMap | Content area | Interactive world map with demo data |
| User Widget | Sidebar/content | List of demo users |

**File Path:** `Darkone-React_v1.0/src/app/admin/dashboard/page.tsx`

---

## 3. Structure Preservation Requirements

The following must remain intact:

| Element | Requirement |
|---------|-------------|
| Page layout | Grid structure preserved |
| Card containers | All 4 card slots maintained |
| Chart containers | Chart wrapper divs preserved |
| Widget containers | All widget slots maintained |
| Bootstrap classes | No class modifications |
| SCSS references | No style changes |

---

## 4. Cards Component Placeholder

### 4.1 Current State

```
cardsData array contains 4 objects with:
- icon
- title
- value (demo number)
- color
```

### 4.2 Placeholder Strategy

| Field | Current | Placeholder Value |
|-------|---------|-------------------|
| icon | Demo icon | Preserved (reusable) |
| title | "Total Sales" etc. | "—" or preserved title |
| value | "12,345" | "—" or "0" |
| color | Theme color | Preserved |

### 4.3 Visual Intent

- Cards appear as empty containers ready for data
- Muted appearance indicating "awaiting connection"
- No demo metrics visible
- Structure clearly indicates 4 available metric slots

### 4.4 Reusability

- Card component structure preserved
- Icon rendering preserved
- Color theming preserved
- Only data values to be neutralized

---

## 5. Chart Component Placeholder

### 5.1 Current State

- ApexCharts line/bar chart
- Demo series data with multiple data points
- Interactive tooltips with demo values

### 5.2 Placeholder Strategy

| Element | Current | Placeholder |
|---------|---------|-------------|
| Chart wrapper | Rendered | Preserved |
| Series data | Demo array | Empty array `[]` |
| Chart type | Line/bar | Preserved |
| Chart options | Full config | Preserved |

### 5.3 Visual Intent

- Chart container visible with axes
- "No data available" message displayed
- Chart dimensions and position maintained
- Ready for real data connection

### 5.4 Empty State Display

To be displayed when series is empty:
```
"No data available"
(centered in chart area, muted text)
```

---

## 6. SaleChart Component Placeholder

### 6.1 Current State

- ApexCharts sales trend visualization
- Demo sales figures over time

### 6.2 Placeholder Strategy

| Element | Current | Placeholder |
|---------|---------|-------------|
| Chart wrapper | Rendered | Preserved |
| Sales data | Demo array | Empty array |
| Time labels | Demo dates | Preserved structure |

### 6.3 Visual Intent

- Sales chart area visible but empty
- Indicates "Sales data pending"
- Chart configuration preserved for future use

---

## 7. CountryMap Component Placeholder

### 7.1 Current State

- jsvectormap world map
- Interactive regions with demo data
- Tooltips showing demo metrics per country

### 7.2 Placeholder Strategy

| Element | Current | Placeholder |
|---------|---------|-------------|
| Map render | Interactive | Static render |
| Region data | Demo values | No data binding |
| Tooltips | Demo content | Disabled or empty |
| Map styling | Theme colors | Preserved |

### 7.3 Visual Intent

- World map visible as static graphic
- No interactive data displayed
- Geographic context preserved
- Ready for regional data connection

---

## 8. User Widget Placeholder

### 8.1 Current State

- List of demo users with avatars
- User names, roles, status indicators

### 8.2 Placeholder Strategy

| Element | Current | Placeholder |
|---------|---------|-------------|
| Widget container | Rendered | Preserved |
| User list | Demo users | Empty array |
| Widget title | "Users" | Preserved |

### 8.3 Visual Intent

- Widget container visible
- "No users to display" message
- Avatar/list structure implied but empty
- Ready for user data connection

### 8.4 Empty State Display

```
"No users to display"
(centered in widget area, muted text)
```

---

## 9. Overall Dashboard Placeholder Appearance

### 9.1 Visual Summary

When placeholders are applied, the Dashboard should display:

| Area | Appearance |
|------|------------|
| Top row | 4 card containers with "—" values |
| Main chart | Empty chart with "No data available" |
| Sales chart | Empty chart with placeholder text |
| Map area | Static world map, no data overlays |
| User widget | Empty list with placeholder message |

### 9.2 Color and Styling

- All Darkone theme colors preserved
- Muted/secondary colors for placeholder text
- No bright or attention-grabbing placeholder styling
- Professional "awaiting data" appearance

### 9.3 Responsiveness

- All responsive breakpoints preserved
- Mobile layout maintained
- Tablet layout maintained
- Desktop layout maintained

---

## 10. Verification Criteria

To be verified after placeholder implementation (when authorized):

| Criterion | Verification Method |
|-----------|---------------------|
| Cards render | Visual inspection — 4 cards visible |
| Chart container visible | Visual inspection — chart area present |
| Map renders | Visual inspection — map graphic visible |
| No demo data | Content audit — no fake numbers/names |
| No console errors | Browser console check |
| Responsive layout | Viewport testing |
| Theme toggle works | Dark/light mode check |

---

## 11. Reusability Preserved

| Component | What Remains Reusable |
|-----------|----------------------|
| Cards | Card component, icons, color system |
| Chart | ApexCharts wrapper, options config |
| SaleChart | Chart component, trend config |
| CountryMap | VectorMap component, region definitions |
| User Widget | Widget structure, avatar handling |

---

## 12. Implementation Notes (For Future Execution)

When Phase 3 execution is authorized:

1. **Cards:** Modify `cardsData` to return placeholder values
2. **Chart:** Set series to empty array, add noData option
3. **SaleChart:** Set series to empty, add empty state
4. **CountryMap:** Remove data bindings, keep static render
5. **User Widget:** Set user array to empty, add empty message

**Reminder:** These are conceptual notes. No implementation is authorized at this time.

---

*Document Version: 1.0*
*Last Updated: Phase 3 Planning*
