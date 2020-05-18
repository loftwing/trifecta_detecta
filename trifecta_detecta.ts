#Trifecta Detecta 
#loft

input price = close;

input length10 = 10;
input length20 = 20;
input length5 = 5;

input displace = 0;


plot SMA10 = MovingAverage(AverageType.Simple, price, length10)[-displace];
plot SMA20 = MovingAverage(AverageType.Simple, price, length20);
plot SMA5 = MovingAverage(AverageType.Simple, price, length5);

def MACD_Data = MACD(12, 26, 9, AverageType.Exponential).Diff;

SMA10.DefineColor(“Up”, GetColor(1));
SMA10.DefineColor("Neutral", GetColor(2));
SMA10.DefineColor(“Down”, GetColor(0));

def allup = SMA10 > SMA10[1] and MACD_Data > MACD_Data[1] and MACD_Data[1] > MACD_Data[2] and MACD_Data > 0 and SMA5 > SMA5[1] and price > SMA20 and SMA5 > SMA10;
def alldown = SMA10 < SMA10[1] and MACD_Data < MACD_Data[1] and MACD_Data[1] < MACD_Data[2] and MACD_Data < 0 and SMA5 < SMA5[1] and price < SMA20 and SMA5 < SMA10;



SMA10.AssignValueColor(if allup then SMA10.color("Up") else if alldown then SMA10.color("Down") else SMA10.color("Neutral"));

Alert(allup, "Up", Alert.BAR, Sound.Bell);
Alert(alldown, "Down", Alert.BAR, Sound.Bell);