# Phase 4 — Admin UI Standard

```
Status: AUTHORITATIVE
Phase: Documentation Only
Execution: Referenced by all modules
Last Updated: 2025-12-22
```

---

## 1. Purpose

This document defines the shared UI patterns for all Phase 4 admin modules. All module implementations MUST follow these patterns to maintain Darkone template parity.

---

## 2. Page Layout Pattern

### 2.1 Standard Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  PageTitle (Breadcrumb)                                     │
├─────────────────────────────────────────────────────────────┤
│  Card                                                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ CardHeader                                               ││
│  │ ┌───────────────────────────────────┐ ┌───────────────┐ ││
│  │ │ Title (h4)                        │ │ [Add Button]  │ ││
│  │ └───────────────────────────────────┘ └───────────────┘ ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ CardBody                                                 ││
│  │                                                          ││
│  │   [Search/Filters]                                       ││
│  │                                                          ││
│  │   [Table or Grid Content]                                ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Required Components

| Component | Source | Usage |
|-----------|--------|-------|
| `PageTitle` | `@/components/PageTitle` | Breadcrumb navigation |
| `Card`, `CardHeader`, `CardBody` | `react-bootstrap` | Content container |
| `Footer` | `@/components/Footer` | Page footer |

---

## 3. Primary Action Button

### 3.1 Placement

The primary action button (Add, Upload, Create) MUST be positioned at the **top-right** of the CardHeader.

### 3.2 Implementation

```tsx
<CardHeader className="d-flex justify-content-between align-items-center">
  <h4 className="header-title mb-0">Page Title</h4>
  <Button variant="primary" onClick={handleAdd}>
    <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
    Add Item
  </Button>
</CardHeader>
```

### 3.3 Button Variants

| Action | Variant | Icon |
|--------|---------|------|
| Add/Create | `primary` | `solar:add-circle-bold` |
| Upload | `primary` | `solar:upload-bold` |
| Export | `outline-primary` | `solar:export-bold` |
| Delete | `danger` | `solar:trash-bin-2-bold` |

---

## 4. Table Pattern

### 4.1 Table Structure

```tsx
<div className="table-responsive">
  <Table className="table-hover text-nowrap mb-0">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.field1}</td>
          <td>{item.field2}</td>
          <td className="text-end">
            {/* Action buttons */}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
```

### 4.2 Action Buttons

| Action | Icon | Variant | Tooltip |
|--------|------|---------|---------|
| View | `solar:eye-bold` | `soft-primary` | "View" |
| Edit | `solar:pen-2-bold` | `soft-warning` | "Edit" |
| Copy URL | `solar:copy-bold` | `soft-info` | "Copy URL" |
| Delete | `solar:trash-bin-2-bold` | `soft-danger` | "Delete" |

### 4.3 Thumbnail Column

For modules with images (Media, Blog, Projects, Testimonials):

```tsx
<td style={{ width: '60px' }}>
  <img 
    src={item.image_url} 
    alt={item.alt_text} 
    width="50" 
    height="50" 
    className="rounded"
    style={{ objectFit: 'cover' }}
  />
</td>
```

---

## 5. Empty State Pattern

### 5.1 Structure

```tsx
<div className="text-center py-5">
  <IconifyIcon 
    icon="solar:folder-open-bold-duotone" 
    className="text-muted mb-3" 
    style={{ fontSize: '4rem' }} 
  />
  <h5 className="text-muted">No items yet</h5>
  <p className="text-muted mb-3">
    Create your first item to get started.
  </p>
  <Button variant="primary" onClick={handleAdd}>
    <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
    Add First Item
  </Button>
</div>
```

### 5.2 Empty State Icons by Module

| Module | Icon |
|--------|------|
| Media Library | `solar:folder-open-bold-duotone` |
| Blog | `solar:document-text-bold-duotone` |
| Projects | `solar:folder-with-files-bold-duotone` |
| Testimonials | `solar:chat-round-dots-bold-duotone` |
| Pages | `solar:document-bold-duotone` |
| Leads | `solar:users-group-rounded-bold-duotone` |

---

## 6. Modal Pattern (Create/Edit)

### 6.1 Modal Structure

```tsx
<Modal show={show} onHide={onClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {/* Form fields */}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onClose}>
      Cancel
    </Button>
    <Button 
      variant="primary" 
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Saving...' : 'Save'}
    </Button>
  </Modal.Footer>
</Modal>
```

### 6.2 Form Field Pattern

```tsx
<Form.Group className="mb-3">
  <Form.Label>Field Label <span className="text-danger">*</span></Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter value"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    isInvalid={!!error}
  />
  <Form.Control.Feedback type="invalid">
    {error}
  </Form.Control.Feedback>
</Form.Group>
```

### 6.3 Modal Sizes

| Content | Size Prop |
|---------|-----------|
| Simple form (2-4 fields) | Default (no prop) |
| Medium form (5-8 fields) | `size="lg"` |
| Complex form / Media picker | `size="xl"` |

---

## 7. Delete Confirmation Modal

### 7.1 Structure

```tsx
<Modal show={show} onHide={onClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete <strong>"{itemName}"</strong>?</p>
    <p className="text-muted mb-0">This action cannot be undone.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onClose}>
      Cancel
    </Button>
    <Button 
      variant="danger" 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  </Modal.Footer>
</Modal>
```

---

## 8. Status Badges

### 8.1 Badge Variants

| Status | Variant | Text |
|--------|---------|------|
| Published | `success` | Published |
| Draft | `warning` | Draft |
| Archived | `secondary` | Archived |
| Active | `success` | Active |
| Inactive | `secondary` | Inactive |
| New | `primary` | New |
| Contacted | `info` | Contacted |
| Qualified | `success` | Qualified |
| Closed | `secondary` | Closed |

### 8.2 Implementation

```tsx
<Badge bg={getStatusVariant(status)}>
  {status.charAt(0).toUpperCase() + status.slice(1)}
</Badge>
```

---

## 9. Toast Notifications

### 9.1 Usage

```tsx
import { toast } from 'react-toastify';

// Success
toast.success('Item saved successfully');

// Error
toast.error('Failed to save item');

// Warning
toast.warning('Please fill all required fields');

// Info
toast.info('Processing...');
```

### 9.2 Standard Messages

| Action | Success Message | Error Message |
|--------|-----------------|---------------|
| Create | "{Type} created successfully" | "Failed to create {type}" |
| Update | "{Type} updated successfully" | "Failed to update {type}" |
| Delete | "{Type} deleted successfully" | "Failed to delete {type}" |
| Upload | "File uploaded successfully" | "Failed to upload file" |

---

## 10. Search and Filter Pattern

### 10.1 Search Input

```tsx
<div className="mb-3">
  <Form.Control
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
```

### 10.2 Filter Dropdowns

```tsx
<Row className="mb-3">
  <Col md={3}>
    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="published">Published</option>
      <option value="draft">Draft</option>
    </Form.Select>
  </Col>
</Row>
```

---

## 11. Compliance Checklist

All modules MUST verify these patterns are implemented:

- [ ] PageTitle with correct breadcrumb
- [ ] Card container with CardHeader and CardBody
- [ ] Primary action button at top-right
- [ ] Table with table-responsive wrapper
- [ ] Actions column at right with correct icons
- [ ] Empty state with icon, message, and CTA
- [ ] Create/Edit modal with correct structure
- [ ] Delete confirmation modal
- [ ] Toast notifications for all CRUD operations
- [ ] Footer component

---

## Document Control

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 2025-12-22 | Planning Agent | Initial release |

**Referenced by:** All Phase 4 module documentation
