<template>
    <div class="card">
        <div class="border-0 card-header">
            <h3 class="mb-0">Мои заказы</h3>
        </div>

        <el-table class="table-responsive table-flush"
                  header-row-class-name="thead-light"
                  :data="projects.slice(0, itemLimit)">
            <el-table-column label="Project"
                             min-width="310px"
                             prop="name"
                             sortable>
                <template v-slot="{row}">
                    <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <div class="media-body">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Сумма"
                             prop="budget"
                             min-width="140px"
                             sortable>
            </el-table-column>

            <el-table-column label="Статус"
                             min-width="170px"
                             prop="status"
                             sortable>
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Пользователь" min-width="190px">
                <div class="avatar-group">
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Иван Иванов">
                        <img alt="Image placeholder" src="/img/theme/team-1.jpg">
                    </a>
                    <!-- <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Иван Иванов">
                        <img alt="Image placeholder" src="/img/theme/team-2.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Иван Иванов">
                        <img alt="Image placeholder" src="/img/theme/team-3.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Иван Иванов">
                        <img alt="Image placeholder" src="/img/theme/team-4.jpg">
                    </a> -->
                </div>
            </el-table-column>

            <el-table-column label="% Доставки"
                             prop="completion"
                             min-width="240px"
                             sortable>
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column min-width="180px">
                <template v-slot="{row}">
                    <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only text-light">
                      <i class="fas fa-ellipsis-v mt-2"></i>
                    </span>
                        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    props: {
      itemLimit: {
        type: Number,
        default: 9
      }
    },
    data() {
      return {
        projects: [
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '2500₽',
            status: 'доставляется',
            statusType: 'warning',
            completion: 60
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '1800₽',
            status: 'выполнен',
            statusType: 'success',
            completion: 100
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '3150₽',
            status: 'отменен',
            statusType: 'danger',
            completion: 72
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '4400₽',
            status: 'на таможне',
            statusType: 'info',
            completion: 90
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '2200₽',
            status: 'доставляется',
            statusType: 'success',
            completion: 100
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '2500₽',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '1800₽',
            status: 'выполнен',
            statusType: 'success',
            completion: 100
          },
          {
            img: '/img/theme/sneakers.jpg',
            title: 'Кроссовки',
            budget: '3150₽',
            status: 'отменен',
            statusType: 'danger',
            completion: 72
          },
          {
            img: '/img/theme/vue.jpg',
            title: 'Кроссовки',
            budget: '2200₽',
            status: 'выполнен',
            statusType: 'success',
            completion: 100
          }
        ],
        currentPage: 1
      };
    }
  }
</script>
