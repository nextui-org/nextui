"use client";

import {
  Button,
  EmptyState,
  Label,
  ListBox,
  ListLayout,
  SearchField,
  Sheet,
  Virtualizer,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useMemo, useState} from "react";

const PROFESSIONS = [
  "会计师和审计师",
  "演员",
  "精算师",
  "行政服务经理",
  "广告和推广经理",
  "广告销售代理",
  "航空航天工程师",
  "农业工程师",
  "空中交通管制员",
  "飞机机械师和维修技术员",
  "救护车司机和随车人员",
  "麻醉科医生",
  "动物管理人员",
  "动画师",
  "仲裁员和调解员",
  "建筑师（景观和船舶建筑除外）",
  "建筑与工程经理",
  "档案管理员",
  "艺术总监",
  "运动防护师",
  "大气与空间科学家",
  "听力学家",
  "汽车车身维修工",
  "汽车维修技术员和机械师",
  "行李搬运员和酒店行李员",
  "面包师",
  "理发师",
  "调酒师",
  "自行车维修工",
  "账单与记账文员",
  "生物化学家和生物物理学家",
  "生物医学工程师",
  "簿记、会计和审计文员",
  "砖石砌筑工",
  "广播技术员",
  "预算分析师",
  "公交车司机",
  "业务运营专员",
  "屠宰工和肉类切割工",
  "橱柜制作工和木工",
  "电视、视频和电影摄影师",
  "心血管技术人员",
  "货运代理",
  "木匠",
  "收银员",
  "水泥和混凝土修整工",
  "厨师长和主厨",
  "化学工程师",
  "化学家",
  "首席执行官",
  "儿童、家庭和学校社会工作者",
  "脊椎治疗师",
  "土木工程师",
  "理赔核算员、审查员和调查员",
  "临床检验技术人员",
  "教练和球探",
  "商业飞行员",
  "社区卫生工作者",
  "薪酬福利经理",
  "计算机与信息系统经理",
  "计算机硬件工程师",
  "计算机网络架构师",
  "程序员",
  "计算机系统分析师",
  "自然资源保护科学家",
  "建筑工人",
  "建筑项目经理",
  "惩教人员和监狱看守",
  "成本估算师",
  "咨询师",
  "法庭记录员和实时字幕员",
  "信用分析师",
  "策展人",
  "客服代表",
  "网络安全分析师",
  "数据科学家",
  "数据库管理员",
  "牙科助理",
  "口腔卫生师",
  "牙医",
  "侦探和刑事调查员",
  "医学超声诊断技师",
  "膳食与营养师",
  "宗教活动和教育负责人",
  "唱片骑师",
  "调度员",
  "经济学家",
  "编辑",
  "教育行政人员",
  "电气工程师",
  "电工",
  "小学教师",
  "应急管理负责人",
  "急救技术员和护理人员",
  "环境工程师",
  "环境科学家和专员",
  "流行病学家",
  "活动策划师",
  "运动生理学家",
  "时装设计师",
  "影视剪辑师",
  "金融分析师",
  "金融审查员",
  "财务经理",
  "消防检查员和调查员",
  "消防员",
  "健身教练和有氧运动指导员",
  "空乘人员",
  "花艺设计师",
  "食品科学家和技术人员",
  "法医学技术员",
  "筹款专员",
  "殡葬服务人员",
  "总经理和运营经理",
  "遗传咨询师",
  "地理学家",
  "地球科学家",
  "玻璃安装工",
  "平面设计师",
  "美发师、发型师和美容师",
  "健康与安全工程师",
  "医疗社会工作者",
  "供暖、空调和制冷维修工",
  "高中教师",
  "历史学家",
  "居家健康和个人护理员",
  "人力资源经理",
  "人力资源专员",
  "水文学家",
  "工业设计师",
  "工业工程师",
  "工业机械维修工",
  "信息安全分析师",
  "保险评估师",
  "保险销售代理",
  "保险核保员",
  "室内设计师",
  "口译和笔译人员",
  "保洁员",
  "珠宝和宝石加工人员",
  "新闻工作者",
  "法官",
  "幼儿园教师",
  "景观建筑师",
  "律师",
  "图书管理员和媒体馆藏专员",
  "执业护士",
  "信贷员",
  "锁匠和保险柜维修工",
  "物流专员",
  "机器学习工程师",
  "机械加工工人",
  "家政和客房清洁员",
  "管理分析师",
  "轮机工程师和船舶设计师",
  "市场研究分析师",
  "市场营销经理",
  "婚姻和家庭治疗师",
  "按摩治疗师",
  "数学家",
  "机械工程师",
  "医疗助理",
  "病案管理专员",
  "医学科学家",
  "微生物学家",
  "初中教师",
  "工业设备安装工",
  "采矿和地质工程师",
  "音乐总监和作曲家",
  "音乐家和歌手",
  "网络与计算机系统管理员",
  "核工程师",
  "麻醉专科护士",
  "高级执业护士",
  "护理助理",
  "职业健康与安全专员",
  "作业治疗师",
  "配镜师",
  "验光师",
  "正畸医生",
  "律师助理和法律助理",
  "停车执法人员",
  "病理科医生",
  "儿科医生",
  "个人理财顾问",
  "害虫防治人员",
  "药剂师",
  "药房技术员",
  "采血员",
  "摄影师",
  "物理治疗助理",
  "物理治疗师",
  "医师助理",
  "内外科医生",
  "物理学家",
  "工业管道和蒸汽管道安装工",
  "水管工",
  "足病医生",
  "警察",
  "政治学家",
  "邮递员",
  "高等教育教师",
  "学前教育教师",
  "私家侦探和调查员",
  "缓刑监督官",
  "制片人和导演",
  "产品经理",
  "物业经理",
  "口腔修复医生",
  "精神科技术人员",
  "精神科医生",
  "心理学家",
  "公关经理",
  "公关专员",
  "采购经理",
  "放射治疗师",
  "放射技术人员",
  "房地产经纪人",
  "接待员和咨询文员",
  "文体活动工作者",
  "娱乐治疗师",
  "注册护士",
  "康复咨询师",
  "记者和通讯员",
  "呼吸治疗师",
  "餐厅厨师",
  "屋顶施工工人",
  "销售工程师",
  "销售经理",
  "校车司机",
  "学校心理学家",
  "保安",
  "钣金工",
  "治安官和副治安官",
  "护肤专员",
  "社会与社区服务经理",
  "社会工作者",
  "软件开发人员",
  "软件质量保证分析师",
  "音响工程技术员",
  "特殊教育教师",
  "言语语言治疗师",
  "统计学家",
  "建筑钢铁结构工",
  "成瘾问题咨询师",
  "外科医生",
  "调查研究员",
  "测量师",
  "税务审查和征收人员",
  "报税服务人员",
  "出租车和专职司机",
  "技术文档撰写员",
  "电信设备安装工",
  "银行柜员",
  "培训与发展经理",
  "培训与发展专员",
  "旅行代理",
  "城市与区域规划师",
  "用户体验设计师",
  "兽医",
  "兽医技术人员",
  "餐厅服务员",
  "水处理设备操作员",
  "网页开发人员",
  "焊接、切割和钎焊工",
  "作家",
  "动物学家和野生生物学家",
].map((name, i) => ({id: i, name}));

const professionSheetSnaps = ["355px"];

export function ProfessionsPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return PROFESSIONS;
    const q = search.toLowerCase();

    return PROFESSIONS.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet
        isOpen={isOpen}
        snapPoints={professionSheetSnaps}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSearch("");
        }}
      >
        <Sheet.Trigger>
          <Button variant="secondary">选择职业</Button>
        </Sheet.Trigger>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
            <Sheet.Dialog aria-label="选择职业">
              <Sheet.Handle />
              <Sheet.Body className="flex min-h-0 flex-col gap-0 overflow-hidden p-0">
                <div className="px-4 pt-1 pb-2">
                  <SearchField
                    aria-label="搜索职业"
                    value={search}
                    variant="secondary"
                    onChange={setSearch}
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="搜索" />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                </div>
                {filtered.length === 0 ? (
                  <EmptyState className="flex min-h-32 flex-1 flex-col items-center justify-center gap-2">
                    <Icon className="size-5 text-muted" icon="gravity-ui:magnifier" />
                    <p className="text-sm text-muted">未找到职业。</p>
                  </EmptyState>
                ) : (
                  <Virtualizer layout={ListLayout} layoutOptions={{padding: 12, rowHeight: 36}}>
                    <ListBox
                      aria-label="职业"
                      className="min-h-0 flex-1 overflow-y-auto p-0"
                      items={filtered}
                      selectionMode="single"
                      onAction={(key) => {
                        const prof = PROFESSIONS.find((p) => p.id === Number(key));

                        if (prof) {
                          setSelected(prof.name);
                          setIsOpen(false);
                        }
                      }}
                    >
                      {(item) => (
                        <ListBox.Item id={item.id} textValue={item.name}>
                          <Label>{item.name}</Label>
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </Virtualizer>
                )}
              </Sheet.Body>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
      <p className="text-sm text-muted">
        已选择： <span className="font-medium text-foreground">{selected}</span>
      </p>
    </div>
  );
}
