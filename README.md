##Android屏幕适配

使用demen文件,拷贝values-swXXXdp文件夹到(项目名\android\app\src\main\res)下即可使用。

##可用环境
* Eclipse
* Android Studio

##使用方法
* 在layout文件下xml布局文件中
* 例如设置布局的高度为21dp
* 21是切图給的px值按dpi换算成的dp值
```
android:layout_height="@dimen/base21dp"
```

参考文档详情查看[CSDN博客](http://blog.csdn.net/zhaoyw2008/article/details/46008513)


##编写dimen文件

* 使用java程序
* 采用dom4j和io
```
/**
 * Dimens 值转换器
 * 把 android 下的 dimens 值按指定的屏幕适配方法转换为多套
 *
 */
public class DimenConverter {
    private static final String directPath = "d:/";
    private static final String referenceDimensFileName = "referencedBaseDimen.xml";
    private static final String dimensFileName = "BaseDimen.xml";

    public static void main(String[] args) {
        generateBaseDimens(referenceDimensFileName, 1.0);
        generateBaseDimens(dimensFileName, 360/320.0);
        System.out.println("dimens文件生产完毕");
    }

    public static void generateBaseDimens(String fileName, double ratio) {
        Document document = DocumentHelper.createDocument();
        document.setXMLEncoding("utf-8");

        Element resourcesElement = document.addElement("resources");
        Element dimenElement;
        DecimalFormat df = new DecimalFormat("#.00");
        for (int i = 1; i < 230; i++) {
            dimenElement = resourcesElement.addElement("dimen");
            dimenElement.addAttribute("name", "base" + i + "dp");
            double convertedDimen = i / ratio;
            dimenElement.setText(df.format(convertedDimen) + "dp");
        }
        try {
            XMLWriter writer = new XMLWriter(new FileWriter(new File(directPath, fileName)));
            writer.write(document);
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

##java程序说明
* directPath：文件生成后在计算机中的位置
* referenceDimensFileName：基准dimen文件(也就是当前切图所用设备的上标注的值算出来的)
* dimensFileName: 要适配设备的dimen文件
* generateBaseDimens：函数，用于生成dimen.xml文件
* fileName:希望生成的文件名
* ratio：比值，这里是宽逻辑尺寸的比值，就那个博客里边的。


