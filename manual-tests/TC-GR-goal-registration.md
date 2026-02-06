# Goal Registration — Manual Test Scenarios

**Module:** Goal Registration (Admin)
**Total scenarios:** 7

**Precondition for all scenarios:** User is logged in with Admin role.

---

### TC-GR-001: Create a goal with all fields

**Objective:** Verify that an Admin can register a new goal providing all available fields.

**Preconditions:** Logged in as Admin. Goal catalog page is accessible.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | Reduce Operational Costs by 12% |
| Year | 2026 |
| Description | Target 12% cost reduction across departments |
| Function | Finance |

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Enter "Reduce Operational Costs by 12%" in Name
4. Select "2026" from Year dropdown
5. Enter description text
6. Select "Finance" from Function dropdown
7. Click "Save"

**Expected Result:** Goal is created and listed in the catalog. A confirmation message is displayed. All field values match the input data.

---

### TC-GR-002: Create a goal with only required fields

**Objective:** Verify that a goal can be created without filling optional fields (Description, Function).

**Preconditions:** Logged in as Admin.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | Implement Zero-Based Budgeting |
| Year | 2026 |
| Description | _(empty)_ |
| Function | _(not selected)_ |

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Enter "Implement Zero-Based Budgeting" in Name
4. Select "2026" from Year dropdown
5. Leave Description empty
6. Leave Function unselected
7. Click "Save"

**Expected Result:** Goal is created successfully. The catalog entry shows Name and Year filled, with Description and Function blank or showing a default placeholder.

---

### TC-GR-003: Submit without the Name field

**Objective:** Validate that the system blocks goal creation when the mandatory Name field is empty.

**Preconditions:** Logged in as Admin.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | _(empty)_ |
| Year | 2026 |

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Leave Name empty
4. Select "2026" from Year dropdown
5. Click "Save"

**Expected Result:** The goal is not created. A validation message is displayed indicating that Name is required. The form stays on the creation screen.

---

### TC-GR-004: Submit without the Year field

**Objective:** Validate that the system blocks goal creation when the mandatory Year field is not selected.

**Preconditions:** Logged in as Admin.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | Increase Gross Margin to 65% |
| Year | _(not selected)_ |

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Enter "Increase Gross Margin to 65%" in Name
4. Do not select any option from Year dropdown
5. Click "Save"

**Expected Result:** The goal is not created. A validation message is displayed indicating that Year is required.

---

### TC-GR-005: Submit the form with all fields empty

**Objective:** Verify that the system handles multiple validation errors simultaneously when no fields are filled.

**Preconditions:** Logged in as Admin.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | _(empty)_ |
| Year | _(not selected)_ |
| Description | _(empty)_ |
| Function | _(not selected)_ |

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Leave all fields empty
4. Click "Save"

**Expected Result:** The goal is not created. Validation messages are shown for both Name and Year fields. Optional fields do not trigger validation errors.

---

### TC-GR-006: Verify Year and Function dropdown options

**Objective:** Validate that the Year and Function dropdowns display the correct set of options.

**Preconditions:** Logged in as Admin.

**Input Data:** N/A — this is a UI verification test.

**Steps:**

1. Navigate to the goal catalog
2. Click "New Goal"
3. Click on the Year dropdown and note all available options
4. Click on the Function dropdown and note all available options

**Expected Result:** Year dropdown contains relevant years (at minimum the current year, 2026). Function dropdown contains the expected departments (e.g., Finance, Marketing, Supply Chain, People, Technology). No empty or broken options are shown. Dropdowns are scrollable if options exceed the visible area.

---

### TC-GR-007: Verify created goal appears in the catalog list

**Objective:** Verify that after creating a goal, it is immediately visible in the catalog with all the correct field values.

**Preconditions:** Logged in as Admin. A goal "Automate Financial Reporting" has just been created with all fields filled.

**Input Data:**

| Field | Value |
|-------|-------|
| Name | Automate Financial Reporting |
| Year | 2026 |
| Description | Reduce manual report generation by 80% |
| Function | Finance |

**Steps:**

1. Create the goal above (follow TC-GR-001 steps)
2. After the success message, navigate to the goal catalog list
3. Search or locate "Automate Financial Reporting" in the list
4. Verify the displayed field values

**Expected Result:** The goal "Automate Financial Reporting" appears in the catalog list. All fields (Name, Year, Description, Function) display the values entered during creation. The entry is accessible for future assignment by a Manager.
