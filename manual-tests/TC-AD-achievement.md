# Achievement Definition — Manual Test Scenarios

**Module:** Achievement Definition (Employee)
**Total scenarios:** 7

---

### TC-AD-001: Set valid achievement percentages and verify total calculation

**Objective:** Verify that an employee can set individual goal achievements and that the total is calculated correctly using the formula: total = sum of achievements / number of goals.

**Preconditions:** Logged in as Employee "Carlos Silva". Three Finance goals are assigned: "Reduce Operational Costs by 12%", "Implement Zero-Based Budgeting", "Increase Gross Margin to 65%".

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | 80% |
| Implement Zero-Based Budgeting | 60% |
| Increase Gross Margin to 65% | 100% |

**Steps:**

1. Navigate to the achievement page
2. Enter 80 for "Reduce Operational Costs by 12%"
3. Enter 60 for "Implement Zero-Based Budgeting"
4. Enter 100 for "Increase Gross Margin to 65%"
5. Click "Save"
6. Check the total achievement displayed

**Expected Result:** All values are saved. Total achievement is calculated as (80 + 60 + 100) / 3 = 80% and displayed correctly.

---

### TC-AD-002: Set all goals to 100% (upper boundary)

**Objective:** Verify the system handles the maximum possible total achievement when every goal is at 100%.

**Preconditions:** Logged in as Employee "Carlos Silva" with 3 assigned Finance goals.

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | 100% |
| Implement Zero-Based Budgeting | 100% |
| Increase Gross Margin to 65% | 100% |

**Steps:**

1. Navigate to the achievement page
2. Set all three goals to 100
3. Click "Save"

**Expected Result:** All values are saved. Total achievement = (100 + 100 + 100) / 3 = 100%. The system accepts the total without errors.

---

### TC-AD-003: Set all goals to 0% (lower boundary)

**Objective:** Verify the system handles the minimum possible total achievement when every goal is at 0%.

**Preconditions:** Logged in as Employee "Carlos Silva" with 3 assigned Finance goals.

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | 0% |
| Implement Zero-Based Budgeting | 0% |
| Increase Gross Margin to 65% | 0% |

**Steps:**

1. Navigate to the achievement page
2. Set all three goals to 0
3. Click "Save"

**Expected Result:** All values are saved. Total achievement = (0 + 0 + 0) / 3 = 0%. The system accepts zero as a valid value without treating it as missing or empty.

---

### TC-AD-004: Attempt to set achievement above 100%

**Objective:** Verify that the system rejects individual achievement values exceeding 100%.

**Preconditions:** Logged in as Employee "Carlos Silva" with assigned Finance goals.

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | 120% |

**Steps:**

1. Navigate to the achievement page
2. Enter 120 for "Reduce Operational Costs by 12%"
3. Click "Save"

**Expected Result:** The system rejects the value. A validation error indicates that achievement must be between 0% and 100%. The invalid value is not persisted.

---

### TC-AD-005: Attempt to set a negative achievement value

**Objective:** Verify that the system rejects negative achievement values.

**Preconditions:** Logged in as Employee "Carlos Silva" with assigned Finance goals.

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | -10% |

**Steps:**

1. Navigate to the achievement page
2. Enter -10 for "Reduce Operational Costs by 12%"
3. Click "Save"

**Expected Result:** The system rejects the value. A validation error indicates that achievement cannot be negative. The value is not saved.

---

### TC-AD-006: Verify total calculation with fractional result

**Objective:** Verify that the system correctly handles decimal results in the total achievement calculation, including proper rounding.

**Preconditions:** Logged in as Employee "Carlos Silva" with 3 assigned Finance goals.

**Input Data:**

| Goal | Achievement |
|------|------------|
| Reduce Operational Costs by 12% | 75% |
| Implement Zero-Based Budgeting | 80% |
| Increase Gross Margin to 65% | 50% |

**Steps:**

1. Navigate to the achievement page
2. Enter 75 for "Reduce Operational Costs by 12%"
3. Enter 80 for "Implement Zero-Based Budgeting"
4. Enter 50 for "Increase Gross Margin to 65%"
5. Click "Save"
6. Observe the total achievement value

**Expected Result:** Total = (75 + 80 + 50) / 3 = 68.33%. The system displays a properly rounded or truncated value. The precision and rounding behavior should be consistent (e.g., always 2 decimal places, or always rounded to the nearest integer).

---

### TC-AD-007: Attempt to set achievement without assigned goals

**Objective:** Verify that an employee without assigned goals cannot access or submit achievement values.

**Preconditions:** Logged in as Employee "Roberto Gomes" who has no goals assigned for the current year.

**Input Data:** N/A — no goals available.

**Steps:**

1. Navigate to the achievement page
2. Observe the page state

**Expected Result:** The page either shows no goal entries to fill in, or displays a message indicating that no goals are assigned for the current period. There is no way to submit achievement data. The "Save" button is either disabled or hidden.
