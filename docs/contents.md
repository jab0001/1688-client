# Contents

Discover what’s included in Bootstrap, including our precompiled and source code flavors.
Remember, Bootstrap’s JavaScript components require Bootstrap Vue.

<hr>

#### Vue Argon Dashboard PRO Structure

Once downloaded, unzip the compressed folder and you’ll see something like this:

```
├───vue-argon-dashboard-pro
│   App.vue
│   main.js
│   polyfills.js
│
├───assets
│   ├───css
│   │   │   style.css
│   │   │
│   │   └───nucleo
│   └───sass
│       │   argon.scss
│       │
│       ├───core
│       └───custom
├───axios
│       index.js
│
├───components
│   │   Badge.vue
│   │   BaseAlert.vue
│   │   BaseButton.vue
│   │   BaseDropdown.vue
│   │   BaseHeader.vue
│   │   BasePagination.vue
│   │   BaseProgress.vue
│   │   BaseSlider.vue
│   │   BaseSwitch.vue
│   │   BaseTable.vue
│   │   ButtonCheckbox.vue
│   │   ButtonRadioGroup.vue
│   │   CloseButton.vue
│   │   index.js
│   │   LoadingPanel.vue
│   │   Modal.vue
│   │   NavbarToggleButton.vue
│   │   ValidationError.vue
│   │
│   ├───Breadcrumb
│   │       Breadcrumb.vue
│   │       BreadcrumbItem.vue
│   │       RouteBreadcrumb.vue
│   │
│   ├───Cards
│   │       Card.vue
│   │       StatsCard.vue
│   │
│   ├───Charts
│   │       BarChart.js
│   │       config.js
│   │       DoughnutChart.js
│   │       globalOptionsMixin.js
│   │       LineChart.js
│   │       optionHelpers.js
│   │       PieChart.js
│   │       roundedCornersExtension.js
│   │
│   ├───Collapse
│   │       Collapse.vue
│   │       CollapseItem.vue
│   │
│   ├───Feed
│   │       Comment.vue
│   │
│   ├───Inputs
│   │       BaseCheckbox.vue
│   │       BaseInput.vue
│   │       BaseRadio.vue
│   │       DropzoneFileUpload.vue
│   │       FileInput.vue
│   │       HtmlEditor.vue
│   │       IconCheckbox.vue
│   │       TagsInput.vue
│   │
│   ├───Navbar
│   │       BaseNav.vue
│   │       NavbarToggleButton.vue
│   │
│   ├───NotificationPlugin
│   │       index.js
│   │       Notification.vue
│   │       Notifications.vue
│   │
│   ├───SidebarPlugin
│   │       index.js
│   │       SideBar.vue
│   │       SidebarItem.vue
│   │
│   ├───Tabs
│   │       Tab.vue
│   │       Tabs.vue
│   │
│   ├───Timeline
│   │       TimeLine.vue
│   │       TimeLineItem.vue
│   │
│   └───WorldMap
│           AsyncWorldMap.vue
│           WorldMap.vue
│
├───directives
│       click-ouside.js
│
├───middleware
│       admin.js
│       admin_creator.js
│       auth.js
│       guest.js
│
├───mixins
│       form-mixin.js
│
├───plugins
│       dashboard-plugin.js
│       globalComponents.js
│       globalDirectives.js
│
├───router
│       index.js
│       routes.js
│       starterRouter.js
│
├───store
│   │   index.js
│   │
│   ├───modules
│   │       auth.js
│   │       categories-module.js
│   │       items-module.js
│   │       profile-module.js
│   │       reset.js
│   │       roles-module.js
│   │       tags-module.js
│   │       users-module.js
│   │
│   └───services
│           categories-service.js
│           items-service.js
│           profile-service.js
│           roles-service.js
│           tags-service.js
│           users-service.js
│
├───util
│       throttle.js
│
└───views
    │   Charts.vue
    │   Widgets.vue
    │
    ├───Calendar
    │       Calendar.vue
    │
    ├───Components
    │       Buttons.vue
    │       Cards.vue
    │       GridSystem.vue
    │       Icons.vue
    │       Notifications.vue
    │       Typography.vue
    │
    ├───Dashboard
    │       ActivityFeed.vue
    │       AlternativeDashboard.vue
    │       Dashboard.vue
    │       LightTable.vue
    │       PageVisitsTable.vue
    │       ProgressTrackList.vue
    │       SocialTrafficTable.vue
    │       TaskList.vue
    │       UserList.vue
    │
    ├───Examples
    │   │   UserProfile.vue
    │   │
    │   ├───CategoryManagement
    │   │       AddCategoryPage.vue
    │   │       EditCategoryPage.vue
    │   │       ListCategoryPage.vue
    │   │
    │   ├───ItemManagement
    │   │       AddItemPage.vue
    │   │       EditItemPage.vue
    │   │       ListItemPage.vue
    │   │
    │   ├───RoleManagement
    │   │       AddRolePage.vue
    │   │       EditRolePage.vue
    │   │       ListRolePage.vue
    │   │
    │   ├───TagManagement
    │   │       AddTagPage.vue
    │   │       EditTagPage.vue
    │   │       ListTagPage.vue
    │   │
    │   ├───UserManagement
    │   │       AddUserPage.vue
    │   │       EditUserPage.vue
    │   │       ListUserPage.vue
    │   │
    │   └───UserProfile
    │           UserEditCard.vue
    │           UserPasswordCard.vue
    │
    ├───Forms
    │   │   FormComponents.vue
    │   │   FormElements.vue
    │   │   FormValidation.vue
    │   │
    │   └───FormValidation
    │           BrowserDefaultsValidation.vue
    │           CustomStylesValidation.vue
    │           ServerSideValidation.vue
    │
    ├───GeneralViews
    │       NotFoundPage.vue
    │
    ├───Layout
    │       Content.vue
    │       ContentFooter.vue
    │       DashboardLayout.vue
    │       DashboardNavbar.vue
    │
    ├───Maps
    │       API_KEY.js
    │       GoogleMaps.vue
    │       VectorMaps.vue
    │
    ├───Pages
    │   │   AuthLayout.vue
    │   │   Home.vue
    │   │   Lock.vue
    │   │   Login.vue
    │   │   Pricing.vue
    │   │   Register.vue
    │   │   TimeLinePage.vue
    │   │   UserProfile.vue
    │   │
    │   └───UserProfile
    │           EditProfileForm.vue
    │           UserCard.vue
    │
    ├───Password
    │       Email.vue
    │       Reset.vue
    │
    ├───Starter
    │       SampleFooter.vue
    │       SampleLayout.vue
    │       SampleNavbar.vue
    │       SamplePage.vue
    │
    ├───Tables
    │   │   PaginatedTables.vue
    │   │   projects.js
    │   │   RegularTables.vue
    │   │   SortableTables.vue
    │   │   users.js
    │   │   users2.js
    │   │
    │   ├───PaginatedTables
    │   │       clientPaginationMixin.js
    │   │
    │   └───RegularTables
    │           CheckboxColoredTable.vue
    │           CheckboxTable.vue
    │           DarkTable.vue
    │           InlineActionsTable.vue
    │           LightTable.vue
    │           StripedTable.vue
    │           TranslucentTable.vue
    │
    └───Widgets
            CalendarWidget.vue
            CreditCard.vue
            MembersCard.vue
            PaypalCard.vue
            ProgressTrackList.vue
            StatsCards.vue
            TaskList.vue
            TimelineCard.vue
            VectorMapCard.vue
            VisaCard.vue
```

#### Bootstrap components

Here is the list of Bootstrap 4 components that were restyled in Argon:

<div class="row row-grid mt-5">
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Alerts</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Badge</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Buttons</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Carousel</h6>
      </div>
    </div>
  </div>
</div>

<div class="row row-grid">
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Dropdowns</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Forms</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Modal</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Navs</h6>
      </div>
    </div>
  </div>
</div>
