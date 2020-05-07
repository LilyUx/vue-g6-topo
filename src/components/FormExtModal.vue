<!--
 * @Author: 陈晨
 * @Description: 表单组件
 * @Date: 2019-05-28 09:43:28
 * @LastEditTime: 2020-04-27 10:15:31
 * @LastEditors: Jean
 * @UpdateLogs: 功能：1. 新增isShowOkBtn和cancelText这两个功能属性;2.调整上下行的间距
 -->

<template>
    <div class="FormModal">
        <Modal 
            v-model="isShow" 
            :width="width+'px'" 
            :styles="styles"
            :closable="closable"
            :mask-closable="closable">
            <p slot="header" style="font-size:16px">
                <span>{{data.title}}</span>
            </p>
            <Form 
                ref="form"
                v-if="!$slots.default"
                :model="formData"
                :rules="formValidator"
                label-position="left"  
                :label-width="labelWidth">
                <FormItem 
                    v-for="(form, i) of data.form"
                    :key="`form-${i}`"
                    :prop="`${form.key}-${i}`"
                    v-if="!form.hide" 
                    :label="form.label">
                    <!--switch 开关-->
                    <i-switch
                        v-if="form.key == 'switch'" 
                        v-model="formData[`${form.key}-${i}`]" 
                        :size="form.size"
                        :disabled="form.disabled || false">
                        <span slot="open">{{form.item && form.item[0]}}</span>
                        <span slot="close">{{form.item && form.item[1]}}</span>
                    </i-switch>
                    <!--radio 单选-->
                    <RadioGroup 
                        v-if="form.key == 'radio'"
                        v-model="formData[`${form.key}-${i}`]" 
                        :type="form.type"
                        :vertical="form.vertical || false"
                        :size="form.size">
                        <Radio 
                            v-for="(radio, j) of form.item"
                            :label="radio.label"
                            :key="`${j}-${radio.label}`" 
                            :disabled="radio.disabled || false"
                        />
                    </RadioGroup>
                    <!--select 下拉框-->
                    <Select 
                        v-if="form.key == 'select'"
                        v-model="formData[`${form.key}-${i}`]"
                        :clearable="form.clearable || false"
                        :filterable="form.filterable || false"
                        :multiple="form.multiple || false"
                        :disabled="form.disabled || false"
                        :placeholder="form.placeholder || '请选择'"
                        @on-change='v => {changeSelect(v, form.label)}'
                        :style="form.style">
                        <Option 
                            v-for="(item, k) of form.item"
                            :key="`${k}-${item.value}`"
                            :value="item.value"
                            :label="item.label"
                            >{{item.label}} <span v-if="item.name" style="float:right;color:#ccc">{{item.name}}</span></Option>
                    </Select>
                    <!--input 输入框-->
                    <Input 
                        v-if="form.key == 'input'"
                        v-model="formData[`${form.key}-${i}`]"
                        :clearable="form.clearable || false"
                        :disabled="form.disabled || false"
                        :type="form.type || 'text'"
                        :placeholder="form.placeholder"
                        :style="form.style"
                    />
                </FormItem>
            </Form>
            <slot v-if="$slots.default"></slot>
            <div slot="footer">
                <slot name="footer">
                    <Button type="text" size="large" @click="cancel">{{cancelText}}</Button>
                    <Button type="primary" size="large" @click="submit" v-if="isShowOkBtn" :loading="isLoading">{{okText}}</Button>
                </slot>
            </div>
        </Modal>
    </div>
</template>

<script>

/**
 *  component: FormExtModal 集成表单组件的modal框，支持input，select,radio以及switch。
 *  author: Alan Chen
 *  lastDate: 2019/3/25
 *  使用：
 *      props:
 *          1. value  通过v-model来绑定一个变量来控制modal显示，默认为false
 *          2. closable [Boolean],可选，默认true，是否可关闭，通过右上角关闭按钮和Esc键
 *          3. isShowOkBtn [Boolean],可选，默认true，表示默认有确定按钮
 *          4. cancelText [String],可选，默认‘取消’
 *          5. okText [String],可选，默认‘确定’，modal框点击submit事件的按钮文本
 *          6. width [Number],可选，默认520，modal框宽度
 *          7. labelWidth [Number],可选，默认80，FormItem组件的label-width属性，当为0时，表单组件会换行
 *          8. styles [Object | String],可选，默认为空，modal框的样式，与vue原生style属性一致
 *          9. data [Object], 必选，modal框内的表单数据，格式如下：
 *              data: {
 *                  title, Modal的名称，在左上角
 *                  form: [ form的集合，通过key来区分input，select, radio和switchconso
 *
 *                      *** input ***
 *                      {
 *                          key: 'input',
 *                          label,  左侧input的标题
 *                          default, input默认绑定的值，可选，默认为空
 *                          type   input的类型，默认为text,可选值为 text、password、textarea、url、email、date
 *                          placeholder input的placehoder
 *                          disabled  控制input是否可用，默认为false
 *                          clearable  是否可清除，默认为false
 *                          hide  控制input是否隐藏，默认为false
 *                          style 样式对象，与vue原生的style一一致
 *                      },
 *
 *                      *** select ***
 *                      {
 *                          key: 'select',
 *                          label, 左侧select的标题
 *                          default, select默认绑定的值，可选，默认为空
 *                          item: [
 *                              label, option中显示的内容
 *                              value  option中与label对应绑定的值
 *                          ],
 *                          clearable  是否可清除，只有单选模式生效
 *                          filterable 是否可被搜索，即是否可以输入过滤下拉框
 *                          multiple   是否多选，默认为false
 *                          placeholder  默认显示的文字内容
 *                          disabled 控制select是否可用，默认为false
 *                          hide  控制select是否隐藏，默认为false
 *                          style 样式对象，与vue原生的style一一致
 *                      },
 *
 *                       *** switch ***
 *                      {
 *                           key: 'switch',
 *                           label,  switch左侧的名称
 *                           default, switch默认绑定的值，可选，默认为false
 *                           item,  【Array | String】开关的名称
 *                           size,     开关大小，可选large，default和small
 *                           disabled, 是否被禁用，默认为false
 *                           hide  控制switch是否隐藏，默认为false
 *                      }
 *
 *                      *** radio ***
 *                      {
 *                          key: 'radio',
 *                          label,  radio左侧的名称
 *                          default, radio默认绑定的值，可选，默认为空
 *                          item: [
 *                              label,  radio的名字
 *                              disabled  是否被禁用，默认为false
 *                          ],
 *                          type,   可选‘button’，默认为空，button表示以按钮样式布局
 *                          vertical,  radio是否开启垂直布局，默认false
 *                          size,     radio大小，可选large，default和small
 *                          hide  控制radio是否隐藏，默认为false
 *                      }
 *                  ]
 *              }
 *            data中每个数组项对象都支持validate，validate默认为空数组，用于表单验证，格式如下：
 *                  validate： [
 *                      {
 *                          required,  [boolean],验证是否必输入，默认为false
 *                          type,  [string],验证数据类型，默认为string，可选string，number，method(函数)，boolean，integer(整形)，float(浮点型)，array，object，date(Date对象)，url(网址字符串)和email(邮箱字符串)
 *                          message,  [string],验证失败的文本，默认为空字符串
 *                          trigger, [string],触发验证的条件，默认为change加blur，可选blur和change事件
 *                          len,  [number],验证长度必须为len，可选，默认不开启，无论type是什么类型，都默认调用length属性
 *                          min,  [number],验证长度最小为min，可选，默认不开启
 *                          max,  [number],验证长度最大为max，可选，默认不开启
 *                          validator  [function],自定义验证规则，可选，默认不开启，一旦开启，除了message和trigger，其余都失效。message和trigger会覆盖自定义函数配置
 *                                     函数支持异步调用。返回3个参数：
 *                                     validator: (rule, value, cb) => {
 *                                           // rule是当前规则对象，value是当前被验证的值，cb是个回调函数
 *                                           // 当验证通过，必须手动调用cb(),不传参，如果不通过，调用cb(Error),参数必须为一个Error对象
 *                                          if(value == 'alan') {
 *                                              cb()
 *                                          }
 *                                          else {
 *                                              cb(new Error('请输入正确的用户名'))
 *                                          }
 *                                      }
 *                      }
 *                  ]
 *      emitEvents:
 *          1. change,当组件内部绑定的formData(表单绑定值)发生改变触发。返回1个参数，一个数组，根据form的索引返回绑定的值
 *          2. submit,点击ok-text按钮触发。返回2个参数，params包含所有表单组件最后选中的值和表单验证的结果。done是一个回调函数，调用后关闭modal
 *      methods：
 *          1. validate，验证整个表单。参数是一个回调函数，验证整个表单，回调函数返回一个参数status，Boolean类型，表示当前表单是否验证成功
 *          2. validateField，只验证某一个FormItem组件。有两个参数
 *                  参数一是prop，格式为form中key值加当前索引，例如：input-1.
 *                  参数二是一个回调函数，验证prop对应的表单组件，回调函数返回一个参数status，Boolean类型，表示当前表单组件是否验证成功
 *          3. resetValidate，重置整个表单验证状态。无参数，清空表单的验证状态，恢复初始值
 *          4. restValidateField，只重置某一个FormItem组件验证状态。参数是prop，，格式为form中key值加当前索引，例如：input-1。表示
 *      slots：
 *          1. defalut，会覆盖原有的表单组件
 *          2. footer，会覆盖掉原有submit事件
 */
export default {
    name: 'FormExtModal',
    props: {
        value: { // 用于自定义表单组件v-model双向绑定，名称必须为value
            type: Boolean,
            default: false
        },
        isShowOkBtn: {
            type: Boolean,
            default: true
        },
        closable: {
            type: Boolean,
            default: true
        },
        okText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        width: {
            type: Number,
            default: 520
        },
        labelWidth: {
            type: Number,
            default: 80
        },
        styles: {
            type: Object
        },
        data: {
            type: Object,
            required: true
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            isShow: false,
            formData: {},
            formValidator: {}
        };
    },
    computed: {
        formDefaultValue () {
            return this.data.form.map(item => item.default);
        }
    },
    // 通过两个监听，使父子组件中的两个v-model保持同步
    watch: {
        value (val) {
            this.isShow = val;
        },
        isShow (val) {
            this.$emit('input', val);
        },
        // 直接监听data.form会出现监听失败的情况！
        // 当父组件传入的data内form数组项default值发生改变，重新初始化表单绑定的值，为了让组件外可以动态改变表单绑定值
        'formDefaultValue' () {
            this.init();
        },
        // 当组件内部绑定的formData发生改变，返回change事件，方便父组件来监听表单值的变化，返回值是一个数组，根据form的索引返回绑定的值
        formData: {
            handler (val) {
                let returnVal = [];
                Object.entries(val).forEach(item => {
                    const key = item[0].split('-')[1];
                    const value = item[1];
                    returnVal[key] = value;
                });
                this.$emit('change', returnVal);
            },
            deep: true
        }
    },

    created () {
        this.init();
    },
    methods: {
        // 初始化组件的值，包括表单组件绑定的值，以及rules
        init () {
            this.data.form.forEach((item, i) => {
                const type = item.key;
               // 每次初始化值，先取default，再取上次表单用户选中的值，如果都没有，则赋值为空
                const defaultVal = item.default === undefined
                                 ? this.formData[`${type}-${i}`]
                                 : item.default;
                const validator = item.validate || [];

                if (type === 'select' && item.multiple) {
                    const val = defaultVal || [];
                    this.$set(this.formData, `${type}-${i}`, val);
                } else if (type === 'switch') {
                    const val = defaultVal || false;
                    this.$set(this.formData, `${type}-${i}`, val);
                } else {
                    const val = defaultVal || '';
                    this.$set(this.formData, `${type}-${i}`, val);
                }
                this.$set(this.formValidator, `${type}-${i}`, validator);
            });
        },
        cancel () {
            this.isShow = false;
        },
        submit () {
            const done = () => {
                this.isShow = false;
            };

            const params = Object.entries(this.formData).map((item, i) => {
                let label, value, type;
                type = item[0].split('-')[0];
                value = item[1];
                label = this.data.form[i].label;
                return { type, label, value };
            });
            this.$refs.form.validate(status => {
                const returnVal = { params, status };
                this.$emit('submit', returnVal, done);
            });
        },
        changeSelect (val, name) {
            this.$emit('changeSelect', val, name);
        },
        validate (cb) {
            this.$refs.form.validate(cb);
        },
        validateField (prop, cb) {
            this.$refs.form.validateField(prop, cb);
        },
        resetValidate () {
            this.$refs.form.resetFields();
        },
        resetValidateField (prop) {
            const targetFormItem = this.$refs.form.fields.find(item => item.$props.prop === prop);
            targetFormItem.resetField();
        }
    }
};
</script>

<style lang="css" scoped>
.ivu-form-item {
    margin-bottom: 24px;
}
</style>