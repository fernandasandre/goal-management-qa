# Goal Assignment — Manual Test Scenarios

**Module:** Goal Assignment (Manager)
**Total scenarios:** 7

---

### TC-GA-001: Assign 3 goals to an employee (minimum required)

**Objective:** Verify that a Manager can assign the minimum number of goals (3) to an employee, respecting function and year matching rules.

**Preconditions:** Logged in as Manager. Employee "Carlos Silva" exists with function Finance. At least 3 Finance goals exist in the catalog for 2026 with all fields filled.

**Input Data:**

| Employee | Function |
|----------|----------|
| Carlos Silva | Finance |

| Goal | Year | Function |
|------|------|----------|
| Reduce Operational Costs by 12% | 2026 | Finance |
| Implement Zero-Based Budgeting | 2026 | Finance |
| Increase Gross Margin to 65% | 2026 | Finance |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva"
3. Search and assign "Reduce Operational Costs by 12%"
4. Search and assign "Implement Zero-Based Budgeting"
5. Search and assign "Increase Gross Margin to 65%"
6. Click "Save"

**Expected Result:** Three goals are assigned to Carlos Silva. A confirmation message is displayed. The employee's assigned goals list shows exactly 3 entries with correct names.

---

### TC-GA-002: Assign 5 goals to an employee (maximum allowed)

**Objective:** Verify that a Manager can assign the maximum number of goals (5) to an employee.

**Preconditions:** Logged in as Manager. Employee "Carlos Silva" exists with function Finance. At least 5 Finance goals exist in the catalog for 2026 with all fields filled.

**Input Data:**

| Employee | Function |
|----------|----------|
| Carlos Silva | Finance |

| # | Goal |
|---|------|
| 1 | Reduce Operational Costs by 12% |
| 2 | Implement Zero-Based Budgeting |
| 3 | Increase Gross Margin to 65% |
| 4 | Automate Financial Reporting |
| 5 | Optimize Working Capital |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva"
3. Assign all 5 goals listed above
4. Click "Save"

**Expected Result:** Five goals are assigned to Carlos Silva. The system accepts the assignment without errors. The employee's goal list shows all 5 entries.

---

### TC-GA-003: Attempt to assign a 6th goal (exceed maximum)

**Objective:** Verify that the system blocks assigning more than 5 goals to a single employee.

**Preconditions:** Logged in as Manager. Employee "Carlos Silva" already has 5 goals assigned. A 6th Finance goal exists in the catalog for 2026.

**Input Data:**

| Employee | Currently assigned | Goal to add |
|----------|-------------------|-------------|
| Carlos Silva | 5 goals | Reduce Days Sales Outstanding |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva" (who already has 5 goals)
3. Attempt to assign "Reduce Days Sales Outstanding"
4. Click "Save"

**Expected Result:** The system prevents the 6th assignment. An error message indicates that the maximum of 5 goals has been reached. The employee's goal list remains unchanged at 5.

---

### TC-GA-004: Attempt to save with fewer than 3 goals assigned

**Objective:** Verify that the system enforces the minimum of 3 goals per employee.

**Preconditions:** Logged in as Manager. Employee "Carlos Silva" has no goals assigned. At least 2 Finance goals exist for 2026.

**Input Data:**

| Employee | Goals to assign |
|----------|----------------|
| Carlos Silva | Reduce Operational Costs by 12%, Implement Zero-Based Budgeting |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva"
3. Assign only 2 goals
4. Click "Save"

**Expected Result:** The system rejects the save operation. An error message indicates that a minimum of 3 goals is required. The partial assignment is not persisted.

---

### TC-GA-005: Assign a goal whose function does not match the employee's

**Objective:** Verify that the system prevents assigning a goal to an employee from a different function.

**Preconditions:** Logged in as Manager. Employee "Carlos Silva" has function Finance. Goal "Launch Summer Brand Campaign" exists with function Marketing, year 2026, all fields filled.

**Input Data:**

| Employee | Employee Function | Goal | Goal Function |
|----------|-------------------|------|---------------|
| Carlos Silva | Finance | Launch Summer Brand Campaign | Marketing |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva" (Finance)
3. Attempt to assign "Launch Summer Brand Campaign" (Marketing)

**Expected Result:** The system blocks the assignment and displays an error message indicating that the employee's function does not match the goal's function.

> **Note:** An additional preventive approach would be filtering the goal search results by the selected employee's function, so mismatched goals are never shown. Both behaviors can coexist.

---

### TC-GA-006: Assign a goal from a different year

**Objective:** Verify that the system prevents assigning a goal whose year does not match the current year.

**Preconditions:** Logged in as Manager. Current year is 2026. A Finance goal exists for year 2025 with all fields filled. Employee "Carlos Silva" has function Finance.

**Input Data:**

| Employee | Current Year | Goal | Goal Year |
|----------|-------------|------|-----------|
| Carlos Silva | 2026 | Legacy Cost Analysis | 2025 |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva"
3. Attempt to assign "Legacy Cost Analysis" (year 2025)

**Expected Result:** The system blocks the assignment and displays an error indicating that only goals from the current year (2026) can be assigned.

> **Note:** A preventive UX improvement would be filtering the goal catalog to only show goals matching the current year, eliminating the possibility of selecting outdated goals.

---

### TC-GA-007: Assign a goal created without optional fields (cross-module rule)

**Objective:** Verify that a goal validly created by an Admin with only the required fields (Name and Year) cannot be assigned by a Manager. Although Description and Function are optional during registration, the assignment rule requires all fields to be filled. This test validates the interaction between both modules.

**Preconditions:** Logged in as Manager. An Admin has previously created the goal "Improve Cash Flow" with only Name and Year (Description and Function were left empty, which is allowed in the registration module). Employee "Carlos Silva" has function Finance.

**Input Data:**

| Goal | Name | Year | Description | Function |
|------|------|------|-------------|----------|
| Created by Admin (valid) | Improve Cash Flow | 2026 | _(empty)_ | _(empty)_ |

**Steps:**

1. Navigate to the goal assignment page
2. Select employee "Carlos Silva"
3. Search for "Improve Cash Flow"
4. Attempt to assign it

**Expected Result:** The system blocks the assignment. Even though the goal was validly saved in the catalog, the assignment rule ("all fields must be filled") prevents it from being assigned until an Admin completes the missing fields (Description and Function).

> **Note:** A preventive approach would be filtering incomplete goals out of the Manager's search results entirely, so only fully-filled goals are available for assignment.
