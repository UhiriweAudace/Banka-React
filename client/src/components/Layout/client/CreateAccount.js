import React, { Component } from 'react'

class CreateAccount extends Component {
  render() {
    return (
    <div class="main create-account">
      <div></div>
      <div>
        <div class="form">
          <h3 class="d-purple">Create New Bank Account</h3>
          <hr />
          <div class="rows">
            <div class="col-1">
              <label for="">National Identity Card Number <span class="is-required">*</span></label><br/>
              <input type="number" name="id" id="id" placeholder="Type your ID Number" /><br/>
              <span id="error-message" class="error">id field is required</span>
            </div>
            <div class="col-1">
              <label for="">Country Residence <span class="is-required">*</span></label><br/>
              <input type="text" name="country-residence" id="country-residence" placeholder="Type your Country Residence" /><br/>
              <span id="error-message" class="error">Lastname field is required</span>
            </div>
          </div>
          <div class="rows">
            <div class="col-1">
              <label for="">Country Of Birth <span class="is-required"></span></label><br/>
              <input type="text" name="countrybirth" id="countrybirth" placeholder="Type your Country of Birth" /><br/>
              <span id="error-message" class="error"></span>
            </div>
            <div class="col-1">
              <label for="">Date of Birth <span class="is-required">*</span></label><br/>
              <input type="date" name="DateOfBirth" id="DateOfBirth" placeholder="Type your Date Of Birth" /><br/>
              <span id="error-message" class="error">DateOfBirth field is required</span>
            </div>
          </div>
          <div class="rows">
            <div class="col-1">
              <label for="">Currency Type <i>(eg: For Rwandan Francs => Rwf)</i> <span class="is-required">*</span></label><br/>
              <input type="text" name="currency" id="currency" placeholder="Type your currency type" /><br/>
              <span id="error-message" class="error">Currency field is required</span>
            </div>
            <div class="col-1">
              <label for="">Phone Number <span class="is-required"></span></label><br/>
              <input type="number" name="phone" id="phone" placeholder="Type your Phone Number" /><br/>
              <span id="error-message" class="error"></span>
            </div>
          </div>
          <div class="rows">
            <div class="col-1">
              <label for="">Address <span class="is-required"></span></label><br/>
              <input type="text" name="address" id="address" placeholder="Type your current address city" /><br/>
              <span id="error-message" class="error-message"></span>
            </div>
            <div class="col-1">
              <label for="">Account Type <span class="is-required">*</span></label><br/>
              <select name="account-type" id="account-type">
                <option value="1" disabled>Select Account type</option>
                <option value="saving">Saving Account</option>
                <option value="current">Current Account</option>
              </select><br/>
              <span id="error-message" class="error-message"></span>
            </div>
          </div>
          <div class="">
            <div class="col-1">
              <button class="btn-1 primary" id="create">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default CreateAccount;
