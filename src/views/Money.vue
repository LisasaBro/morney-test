<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync='record.type'
    />
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入备注"
                @update:value="onUpdateNotes" :value.sync="record.notes"/>
    </div>

    <Tags @update:value="record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constant/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tabs, FormItem, Tags, Notes: FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  created() {
    this.$store.commit('fetchRecord');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if(!this.record.tags || this.record.tags.length === 0){
      return window.alert('请至少选择一项标签')
    }
    this.$store.commit('createRecord', this.record);
    if(this.$store.state.createRecordError === null){
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 10px 0;
}
</style>