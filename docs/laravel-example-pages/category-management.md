# Category management

Out of the box you will have an example of category management (for the cases in which you are developing a blog or a shop). To access this example, click the "**Examples/Category Management**" link in the left sidebar or add **/examples/category-management/list-categories** to the URL.
You can add and edit categories here, but you can only delete them if they are not attached to any items.

The store used for category functionality is found in `src\store\modules\categories-module.vue`

You can find the compoments for category functionality in `src\views\Examples\CategoryManagement` folder.

```
<div>
  <div
    class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
  >
    <el-select
      class="select-primary pagination-select"
      v-model="pagination.perPage"
      placeholder="Per page"
    >
      <el-option
        class="select-primary"
        v-for="item in pagination.perPageOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <div>
      <form>
        <base-input
          v-model="query"
          type="search"
          prepend-icon="fas fa-search"
          placeholder="Search..."
          clearable
        />
      </form>
    </div>
  </div>
  <el-table
    class="table-responsive align-items-center table-flush"
    header-row-class-name="thead-light"
    :data="categories"
    @sort-change="sortChange"
  >
    <el-table-column label="Name" prop="name" sortable />
    <el-table-column label="Description" prop="description" sortable />
    <el-table-column label="Created At" prop="created_at" sortable />
    <el-table-column align="center">
      <div slot-scope="{ row }" class="table-actions">
        <el-tooltip content="Edit" placement="top">
          <a
            type="text"
            @click="editCategory(row)"
            class="table-action"
            data-toggle="tooltip"
          >
            <i class="fas fa-user-edit"></i>
          </a>
        </el-tooltip>

        <el-tooltip content="Delete" placement="top">
          <a
            type="text"
            @click="deleteCategory(row.id)"
            class="table-action table-action-delete"
            data-toggle="tooltip"
          >
            <i class="fas fa-trash"></i>
          </a>
        </el-tooltip>
      </div>
    </el-table-column>
  </el-table>
</div>
```
